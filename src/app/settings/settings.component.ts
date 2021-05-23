import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../settings.service';
import { LangsService } from '../langs.service';


declare let Tagify: any;

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit {
    @ViewChild('textarea') private $textarea!: ElementRef;
    subscription: any;
    langs: Array<String[]> = [];
    codes: Array<String[]> = [];
    lang = 'English';
    lcid = localStorage.getItem('lcid') ?? location.href.split('/')[0];
    private lcids = ['en-us', 'ru-ru'];
    private updateCodes = ([_, __, ...codes]: [string, number | undefined, String[]]) => codes.some(([code]) => code === this.lcid);
    constructor(
        private settingsService: SettingsService,
        private langsService: LangsService,
        private translate: TranslateService
    ) { }
    ngOnInit(): void {
        this.langsService.getData('assets/json/langs.json')
            .subscribe(langs => {
                this.langs = langs;
                this.codes = langs.find(this.updateCodes)?.slice(2);
                console.log(1112, this.lcid, this.codes)
            });
    }
    ngAfterViewInit(): void {
        new Tagify(this.$textarea.nativeElement).addTags(this.settingsService.tags);
        this.subscription = fromEvent(this.$textarea.nativeElement, 'change')
            .subscribe((event: any) => this.settingsService.save(event.target.value));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    updateLanguage($event: any) {
        this.translate.use('ru');
        
        // this.codes = this.langs[Number($event.target.value)].slice(2);
        console.log(1112, this.codes)
    }
    updateLcid($event: any) {
        const iso6391 = $event.target.value.slice(0, 2);
        const pathname = `/${this.lcids.find(lcid => lcid.startsWith(iso6391))}/settings`;
        if (pathname !== location.pathname) {
            localStorage.setItem('lang', $event.target.value);
            location.pathname = pathname;
        }
        console.log($event.target.value);
    }
}