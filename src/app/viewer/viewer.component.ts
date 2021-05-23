import { Component, OnInit, ElementRef, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DocumentService } from '../document.service';
import { SettingsService } from '../settings.service';

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
    private activeMicSubscription$: any;
    activeMicClassName = false;
    transcript = '';
    output = '';
    id!: number;
    constructor(
        private route: ActivatedRoute,
        private documentService: DocumentService,
        private settingsService: SettingsService,
        private cdRef: ChangeDetectorRef,
        private ngZone: NgZone,
    ) { }
    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.wakeSubscription$ = this.content
            .subscribe((transcript: string) => this.ngZone.run(() => this.transcript = transcript));
        this.activeMicSubscription$ = this.activeMicSource
            .pipe(delay(REMOVE_ACTIVE_MIC_CLASSNAME_DELAY))
            .subscribe((value: boolean) => this.ngZone.run(() => this.activeMicClassName = value));
        //this.content.next('Tip: To search by voice you will have to index some content. Go to Edit mode, select the desired text and then tap the Insert Text icon.');
    }
    ngAfterViewInit(): void {
        new toastui.Editor.factory({
            el: this.$viewer.nativeElement,
            viewer: true,
            initialValue: this.documentService.getDocumentContent(this.id),
            height: '100vh',
            events: {
                load: (): any => {
                    const $refs = this.$viewer.nativeElement.querySelectorAll('del');
                    console.log(901, $refs.length);
                    if ($refs.length === 0) {
                        this.output = 'index';
                        this.cdRef.detectChanges();
                        // this.content.next('Tip: To search by voice you will have to index some content. Go to Edit mode, select the desired text and then tap the Insert Text icon.');
                        return false;
                    }
                    const paragraphs = Array.from($refs, ($el: any): string[] => $el.textContent.toLowerCase().match(/\b(\w|')+\b/gim));
                    const tags = this.settingsService.tags.map((tag: Tag): string => tag.value);
                    const tagsList = tags.map(tag => `"${tag}"`).join(', ');

                    var SpeechRecognition: any = SpeechRecognition || window.webkitSpeechRecognition;
                    var recognition = new SpeechRecognition();
                    recognition.continuous = true;
                    recognition.interimResults = true;
                    var final_transcript = '';

                    let matches = 0;
                    
                    this.content.next(`Tip: You can activate Voice Search by saying ${tagsList}.`);
                    this.cdRef.detectChanges();
                    // This runs when the speech recognition service returns result
                    recognition.onresult = (event: any) => {
                        var interim_transcript = '';
                        for (var i = event.resultIndex; i < event.results.length; ++i) {
                            if (event.results[i].isFinal) {
                                final_transcript += event.results[i][0].transcript;
                            } else {
                                interim_transcript += event.results[i][0].transcript;
                            }
                        }

                        if (interim_transcript === '') {
                            matches = 0;
                        }
                        else {
                            const findTags = (tag: string): boolean => new RegExp(`(^|\\s)${tag}(\\s|$)`, 'i').test(interim_transcript);
                            const activateSearch = tags.some(findTags);
                            console.log(105, interim_transcript);
                            this.content.next(interim_transcript);
                            this.activeMicClassName = true;
                            this.activeMicSource.next(false);
                            if (activateSearch) {
                                const keywords = interim_transcript.match(/\b(\w|')+\b/gim) ?? [];
                                paragraphs.forEach((paragraph: string[], idx): void => {
                                    const paragraphMatches = paragraph.filter(value => keywords.includes(value)).length;
                                    if (paragraphMatches > matches) {
                                        console.log(105, paragraphMatches, matches)
                                        matches = paragraphMatches;
                                        // refIdx = idx;
                                        const $el = $refs[idx];
                                        if ($el.classList.contains('target') === false) {
                                            this.$viewer.nativeElement.querySelector('.target')?.classList.remove('target');
                                            $el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                                            $el.classList.add('target');
                                        }
                                    }
                                });
                            }
                        }
                        var confidence = event.results[0][0].confidence;
                        console.log(102, final_transcript, 103, interim_transcript, confidence);
                    };

                    // start recognition
                    recognition.start();
                }
            },
        });
    }
    ngOnDestroy() {
        this.wakeSubscription$.unsubscribe();
        this.activeMicSubscription$.unsubscribe();
    }
}
