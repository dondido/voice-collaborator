import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../document';

declare let toastui: any;

const SAVE_TIMEOUT_MS = 2000;
const DEFAULT_CONTENT = `
# Awesome Editor!

It has been _released as opensource in 2018_ and has evolved to **receive 10k GitHub ⭐️ Stars**.
`;
const EDITOR_OPTIONS = {
    previewStyle: 'tab',
    height: '100vh',
    toolbarItems: [
        // Using Option: Customize the last button
        {
            type: 'button',
            options: {
                command: 'Strike',
                className: 'tui-indexed',
                tooltip: 'Index text',
                state: 'strike',
            }
        },
        'heading',
        'bold',
        'italic',
        'divider',
        'hr',
        'quote',
        'divider',
        'ul',
        'ol',
        'task',
        'indent',
        'outdent',
        'divider',
        'table',
        'image',
        'link',
        'divider',
        'code',
        'codeblock',
        'divider',
    ],
    customHTMLRenderer: {
        strike(_: any, context: any) {
            return {
                type: context.entering ? 'openTag' : 'closeTag',
                classNames: ['indexed'],
                tagName: 'span'
            };
        },
    }
};

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    @ViewChild('editor') private $editor!: ElementRef;
    private id!: number;
    private editor: any;
    private saveTimeout!: number;
    constructor(private route: ActivatedRoute) { }
    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
    }
    ngAfterViewInit() {
        const raw = localStorage.getItem('documents');
        if (raw) {
            const documents: Document[] = JSON.parse(raw);
            const document: Document | undefined = documents.find((document): boolean => document.id === this.id);
            const initialValue: string = document?.content || DEFAULT_CONTENT;
            this.editor = new toastui.Editor({
                el: this.$editor.nativeElement,
                initialValue,
                events: {
                    change: () => {
                        clearTimeout(this.saveTimeout);
                        this.saveTimeout = window.setTimeout(this.saveSnapshot, SAVE_TIMEOUT_MS)
                    }
                },
                ...EDITOR_OPTIONS
            });
        }
    }
    saveSnapshot() {
        localStorage.setItem('documents', JSON.stringify([{ id: Date.now(), content: this.editor.getMarkdown() }]));
    }

}
