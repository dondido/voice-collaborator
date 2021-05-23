import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DocumentService } from '../document.service';
import { EditorService } from '../editor.service';

declare let toastui: any;

const SAVE_TIMEOUT_MS = 400;

const EDITOR_OPTIONS = {
    previewStyle: '', // leave empty to disable preview tab
    height: '100vh',
    toolbarItems: [
        // Using Option: Customize the last button
        {
            type: 'button',
            options: {
                command: 'Strike',
                className: 'tui-indexed',
                tooltip: `Index text`,
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
};

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    @ViewChild('editor') private $editor!: ElementRef;
    private editor: any;
    private content = new Subject<string>();
    id!: number;
    subscription$!: any;
    constructor(
        private route: ActivatedRoute,
        private editorService: EditorService,
        private documentService: DocumentService,
    ) { }
    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
    }
    ngAfterViewInit(): void {
        this.editorService.scriptSoruce.subscribe(this.initEditor);
    }
    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
    initEditor = (iso: string): void => {
        if (iso) {
            let initialValue = this.documentService.getDocumentContent(this.id);
            if (initialValue === undefined) {
                initialValue = DocumentService.getDefaultDocumentContent();
                this.documentService.save(initialValue, this.id);
            }
            this.editor = new toastui.Editor({
                el: this.$editor.nativeElement,
                initialValue,
                language: iso.replace(/\-(.*)/, code => code.toUpperCase()),
                events: {
                    change: () => this.content.next(this.editor.getMarkdown())
                },
                ...EDITOR_OPTIONS
            });
            this.content.next(initialValue);
            this.subscription$ = this.content.pipe(
                // wait 1300ms after each keystroke before considering the new content
                debounceTime(SAVE_TIMEOUT_MS),
                // ignore new term if same as previous term
                distinctUntilChanged(),
            ).subscribe((content: string) => this.documentService.save(content, this.id));
        }
    }
}
