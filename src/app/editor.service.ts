import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { ScriptService } from './script.service';
import { LangsService } from './langs.service';

const codes = ['ar', 'cs-cz', 'de-de', 'en-us', 'es-es', 'fi-fi', 'fr-fr', 'gl-es', 'it-it', 'ja-jp', 'ko-kr', 'nb-no', 'nl-nl', 'pl-pl', 'ru-ru', 'sv-se', 'tr-tr', 'uk-ua', 'zh-cn', 'zh-tw'];

@Injectable({ providedIn: 'root' })
export class EditorService {
    scriptSoruce = new BehaviorSubject<string>('');
    constructor(private scriptService: ScriptService) {
        const iso = localStorage.getItem('iso');
        if (iso) {
            const iso6391 = iso.slice(0, 2);
            const i18nFile = codes.find(code => code.startsWith(iso6391));
            console.log(100, i18nFile);
            if (i18nFile) {
                fromEvent(scriptService.add(`https://uicdn.toast.com/editor/latest/i18n/${i18nFile}.js`), 'load')
                    .subscribe(() => this.scriptSoruce.next(i18nFile));
                /* scriptService.add(`https://uicdn.toast.com/editor/latest/i18n/${i18nFile}.js`).onload = () => {
                    console.log('SkyScanner Tag loaded');
                } */ 
            }
        }
    }
}
