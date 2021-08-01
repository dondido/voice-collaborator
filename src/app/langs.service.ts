import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


type Lang = [string, number, ...string[][]];

@Injectable({ providedIn: 'root' })
export class LangsService {
    langs: Lang[] = [];
    codes: string[][] = [];
    languageName: string | undefined = 'English';
    lcid = localStorage.getItem('lcid') ?? navigator.language;
    iso6391 = this.lcid.slice(0, 2);
    init$ = new ReplaySubject<any>();
    private init = (languages: Lang[]): void => {
        const removeDisabled = ([__, disabled]: Lang): boolean => Boolean(disabled);
        const langs = languages.filter(removeDisabled);
        const extractLang = () : Lang | undefined => {
            const iso6391 = this.lcid.slice(0, 2);
            const matchLang = ([_, __, entry]: Lang): boolean => entry[0].startsWith(iso6391);
            return langs.find(matchLang);
        };
        let lang = extractLang();
        if (lang === undefined) {
            this.lcid = 'en-US';
            lang = extractLang();
        }
        const [languageName, _, ...codes] = lang || [];
        this.iso6391 = this.lcid.slice(0, 2);
        this.codes = codes;
        this.languageName = languageName;
        this.langs = langs;
    }
    updateCode(lcid: string): void {
        this.lcid = lcid;
        this.iso6391 = lcid.slice(0, 2);
        localStorage.setItem('lcid', lcid);
    }
    constructor(http: HttpClient, private translate: TranslateService) {
        forkJoin([http.get<any>('assets/json/langs.json'), this.translate.get('_tip_activate_voice_search')])
            .subscribe(([a]) => this.init$.next(a));
        this.init$.subscribe(this.init);
    }
}