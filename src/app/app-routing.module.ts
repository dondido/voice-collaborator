import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { EditorComponent } from './editor/editor.component';
import { ViewerComponent } from './viewer/viewer.component';
import { SettingsComponent } from './settings/settings.component';
import { InfoComponent } from './info/info.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
    { path: '', component: DocumentsComponent },
    { path: 'edit/:id', component: EditorComponent },
    { path: 'view/:id', component: ViewerComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'info', component: InfoComponent },
    { path: '**', component: DocumentsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
