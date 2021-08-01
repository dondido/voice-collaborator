import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

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
    changeEventSubscription: any;
    langServiceSubscription: any;
    private tagify: any;
    private saveTag = (event: any) => this.settingsService.save(event.target.value);
    private initTagify = (): void => {
        this.tagify = new Tagify(this.$textarea.nativeElement);
        this.tagify.addTags(this.settingsService.tags);
        this.changeEventSubscription = fromEvent(this.$textarea.nativeElement, 'change')
            .subscribe(this.saveTag);
    }
    constructor(
        private settingsService: SettingsService,
        public langsService: LangsService,
        private translate: TranslateService,
    ) { }
    ngAfterViewInit(): void {
        this.langServiceSubscription = this.langsService.init$
            .pipe(take(1))
            .subscribe(this.initTagify);
    }
    ngOnDestroy() {
        this.changeEventSubscription?.unsubscribe();
        this.langServiceSubscription?.unsubscribe();
    }
    async updateLanguage($event: any) {
        const [languageName, idx, ...codes] = this.langsService.langs[Number($event.target.value)];
        this.langsService.languageName = languageName;
        this.langsService.codes = codes;
        this.langsService.updateCode(codes[idx - 1][0]);
        await this.translate.use(this.langsService.iso6391).toPromise<void>();
        this.changeEventSubscription.unsubscribe();
        this.tagify.removeAllTags();
        this.settingsService.updateTags();
        this.tagify.addTags(this.settingsService.tags);
        this.changeEventSubscription = fromEvent(this.$textarea.nativeElement, 'change').subscribe(this.saveTag);
    }
    updateLcid($event: any) {
        this.langsService.updateCode($event.target.value);
    }
}