import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(translate: TranslateService, router: Router) {
        translate.setDefaultLang(localStorage.getItem('lcid')?.slice(0, 2) || 'en');
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', 'G-HHCV187Y6X', { 'page_path': event.urlAfterRedirects });
            }
        });
    }
}
