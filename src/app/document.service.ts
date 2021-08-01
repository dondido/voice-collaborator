import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Document } from './document';

@Injectable({ providedIn: 'root' })
export class DocumentService {
    documents: Document[] = [];
    documentsSource = new BehaviorSubject<Document[]>(this.documents);
    constructor() {
        const raw = localStorage.getItem('documents');
        this.documentsSource.subscribe(documents => this.documents = documents);
        if (raw) {
            this.documentsSource.next(JSON.parse(raw));
        }
    }
    private filterById(id: number): void {
        const keepDocumentById = (document: Document): boolean => document.id !== id;
        this.documents = this.documents.filter(keepDocumentById);
    }
    private update(): void {
        this.documentsSource.next(this.documents);
        localStorage.setItem('documents', JSON.stringify(this.documents));
    }
    getDocumentContent(id: number): string | undefined {
        const getDocumentById = (document: Document): boolean => document.id === id;
        return this.documents.find(getDocumentById)?.content;
    }
    save(content: string, id: number): void {
        this.filterById(id);
        this.documents.unshift({ id, content });
        this.update();
    }
    delete(id: number): void {
        this.filterById(id);
        this.update();
    }
}
