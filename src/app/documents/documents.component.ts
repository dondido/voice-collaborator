import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Document } from '../document';
import { DocumentService } from '../document.service';

declare let toastui: any;

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
    @ViewChildren('pane') private panes!: QueryList<ElementRef>;
    documents: Document[] = [];
    blankId = Date.now().toString();
    subscription$: any;
    constructor(private documentService: DocumentService) { }
    ngOnInit(): void {
        this.subscription$ = this.documentService.documentsSource.subscribe(documents => this.documents = documents);
    }
    ngAfterViewInit(): void {
        this.panes.toArray().forEach(({ nativeElement }, idx) => {
            new toastui.Editor.factory({
                el: nativeElement,
                viewer: true,
                initialValue: this.documents[idx].content,
                height: '280px',
            });
        });
    }
    deleteDocument(id: number): void {
        if (confirm('Are you sure you want to delete this document?')) {
            this.documentService.delete(id);
        }
    }
    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
}
