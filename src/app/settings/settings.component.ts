import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../settings.service';
import { LangsService } from '../langs.service';

declare let Tagify: any;

type Lang = [string, number, ...string[][]];

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit {
    @ViewChild('textarea') private $textarea!: ElementRef;
    subscription: any;
    langs: Lang[] = [];
    codes: string[][] = [];
    languageName: string | undefined = 'English';
    lcid = localStorage.getItem('lcid') ?? navigator.language;
    private assignLanguage = (languages: Lang[]): void => {
        const removeDisabled = ([__, disabled]: Lang): boolean => Boolean(disabled);
        const langs = languages.filter(removeDisabled);
        const extractLang = () : Lang | undefined => {
            const iso6391 = this.lcid.slice(0, 2);
            const matchLang = ([_, __, entry]: Lang): boolean => entry[0].startsWith(iso6391);
            return langs.find(matchLang);
        };
        let lang = extractLang();
        if (lang === undefined) {
            this.lcid = 'en-US';
            lang = extractLang();
        }
        const [languageName, _, ...codes] = lang || [];
        this.codes = codes;
        this.languageName = languageName;
        this.langs = langs;
    }
    constructor(
        private settingsService: SettingsService,
        private langsService: LangsService,
        private translate: TranslateService,
    ) { }
    ngOnInit(): void {
        this.langsService.getData('assets/json/langs.json')
            .subscribe(this.assignLanguage);
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
        const [languageName, idx, ...codes] = this.langs[Number($event.target.value)];
        this.languageName = languageName;
        this.codes = codes;
        this.lcid = codes[idx - 1][0];
        this.translate.use(this.lcid.slice(0, 2));
        localStorage.setItem('lcid', this.lcid);
    }
    updateLcid($event: any) {
        this.lcid = $event.target.value;
        localStorage.setItem('lcid', this.lcid);
    }
}