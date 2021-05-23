import { Injectable } from '@angular/core';

interface Tag {
    value: string;
}

const DEFAULT_TAGS: Tag[] = [{ value: 'ok'}, { value: 'fine' }];

@Injectable({ providedIn: 'root' })
export class SettingsService {
    tags: Tag[] = [];
    constructor() {
        const raw = localStorage.getItem('tags');
        this.tags = raw ? JSON.parse(raw) : DEFAULT_TAGS;
    }
    save(tags: string): void {
        this.tags = tags ? JSON.parse(tags) : [];
        localStorage.setItem('tags', tags || '[]');
    }
}
