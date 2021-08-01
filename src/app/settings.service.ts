import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangsService } from './langs.service';

interface Tag {
    value: string;
}

interface Dic {
    [key: string]: Tag[]
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
    tags!: Tag[];
    i18nTags: Dic = {};
    private init = (): void => {
        const raw = localStorage.getItem('tags');
        if (raw) {
            this.i18nTags = JSON.parse(raw);  
        }
        this.updateTags();
    };
    constructor(private translate: TranslateService, private langsService: LangsService) {
        this.langsService.init$.subscribe(this.init);
    }
    updateTags(): void {
        this.tags = this.i18nTags[this.langsService.iso6391];
        if (this.tags === undefined) {
            this.tags = [{ value: this.translate.instant('_ok')}, { value: this.translate.instant('_fine') }];
        }
    }
    save(tags: string): void {
        this.tags = tags ? JSON.parse(tags) : [];
        this.i18nTags[this.langsService.iso6391] = this.tags;
        localStorage.setItem('tags', JSON.stringify(this.i18nTags));
    }
}
