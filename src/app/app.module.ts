import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentsComponent } from './documents/documents.component';
import { EditorComponent } from './editor/editor.component';
import { ViewerComponent } from './viewer/viewer.component';
import { NavComponent } from './nav/nav.component';
import { SettingsComponent } from './settings/settings.component';

import { ScriptService } from './script.service';
import { InfoComponent } from './info/info.component';
import { TermsComponent } from './terms/terms.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentsComponent,
    EditorComponent,
    ViewerComponent,
    NavComponent,
    SettingsComponent,
    InfoComponent,
    TermsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [ScriptService],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, `${document.baseURI}assets/i18n/`);
}