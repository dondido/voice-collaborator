import { Component, OnInit, ElementRef, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, from } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { DocumentService } from '../document.service';
import { SettingsService } from '../settings.service';
import { LangsService } from '../langs.service';

declare let toastui: any;
declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

interface Tag {
    value: string;
}

const REMOVE_ACTIVE_MIC_CLASSNAME_DELAY = 1000;

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
    @ViewChild('viewer') private $viewer!: ElementRef;
    private content = new Subject<string>();
    private activeMicSource = new Subject<boolean>();
    private wakeSubscription$: any;
    private getMediaDeviceSubscription: any;
    private activeMicSubscription$: any;
    private $refs: any;
    recognition: any;
    activeMicClassName = false;
    transcript = '';
    output!: string;
    id!: number;
    listen = (): void => {
        const paragraphs = Array.from(this.$refs, ($el: any): string[] => $el.textContent.toLowerCase().match(/\b(\w|')+\b/gim));
        const tags = this.settingsService.tags.map((tag: Tag): string => tag.value);
        const recognition = new window.webkitSpeechRecognition();
        let matches = 0;
        recognition.interimResults = true;
        // This runs when the speech recognition service returns result
        recognition.onresult = (event: any) => {
            let interim_transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                interim_transcript += event.results[i][0].transcript;
            }
            let activateSearch = false;
            for (const tag of tags) {
                if (new RegExp(`(^|\\s)${tag}(\\s|$)`, 'i').test(interim_transcript)) {
                    activateSearch = true;
                    break;
                }
            }
            this.content.next(interim_transcript);
            this.activeMicClassName = true;
            this.activeMicSource.next(false);
            if (activateSearch) {
                const keywords = interim_transcript.match(/\b(\w|')+\b/gim) ?? [];
                let $el: any;
                for (let i = 0; i < paragraphs.length; ++i) {
                    const paragraph = paragraphs[i];
                    let paragraphMatches = 0;
                    for (const value of paragraph) {
                        if (keywords.includes(value)) paragraphMatches++;
                    }
                    if (paragraphMatches > matches) {
                        matches = paragraphMatches;
                        $el = this.$refs[i];
                    }
                }
                if ($el?.classList.contains('target') === false) {
                    this.$viewer.nativeElement.querySelector('.target')?.classList.remove('target');
                    $el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                    $el.classList.add('target');
                }
            }
        };
        recognition.onsoundend = () => matches = 0;
        recognition.onend = () => recognition.start();
        recognition.lang = this.langsService.lcid;
        // start recognition
        recognition.start();
        this.recognition = recognition;
        this.output = '';
    }
    constructor(
        private route: ActivatedRoute,
        private documentService: DocumentService,
        private settingsService: SettingsService,
        private translate: TranslateService,
        private cdRef: ChangeDetectorRef,
        private ngZone: NgZone,
        private langsService: LangsService
    ) { }
    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.wakeSubscription$ = this.content
            .subscribe((transcript: string) => this.ngZone.run(() => this.transcript = transcript));
        this.activeMicSubscription$ = this.activeMicSource
            .pipe(delay(REMOVE_ACTIVE_MIC_CLASSNAME_DELAY))
            .subscribe((value: boolean) => this.ngZone.run(() => this.activeMicClassName = value));
     }
    ngAfterViewInit(): void {
        new toastui.Editor.factory({
            el: this.$viewer.nativeElement,
            viewer: true,
            initialValue: this.documentService.getDocumentContent(this.id),
            height: '100vh',
            events: {
                load: (): any => this.langsService.init$
                    .pipe(take(1))
                    .subscribe(() => {
                        this.content.next(this.translate.instant('_tip_activate_voice_search'));
                        this.cdRef.detectChanges();
                        this.enableAudio();
                    })
            },
        });
    }

    enableAudio() {
        this.getMediaDeviceSubscription = from(navigator.mediaDevices.getUserMedia({ audio: true }))
            .pipe(take(1))
            .subscribe({
                error: () => {
                    this.output = 'muted';
                    alert(this.translate.instant('_unable_to_access_microphone'));
                },
                complete: () => {
                    this.$refs = this.$viewer.nativeElement.querySelectorAll('del');
                    this.output = '#';
                    if (this.settingsService.tags?.length === 0) {
                        this.output = 'tags';
                    }
                    else if (this.$refs.length === 0) {
                        this.output = 'index';
                    }
                    else if ('ontouchstart' in document.documentElement) {
                        this.output = 'mobile';
                    }
                    this.cdRef.detectChanges();
                },
            });
    }
}
