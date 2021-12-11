import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListSentencesComponent } from './list-sentences/list-sentences.component';
import { SentenceDetailComponent } from './sentence-detail/sentence-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChildSentenceAddComponent } from './child-component/child-sentence/child-sentence-add/child-sentence-add.component';
import { ChildSentenceEditComponent } from './child-component/child-sentence/child-sentence-edit/child-sentence-edit.component';
import { LoginComponent } from './login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faDoorOpen, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        AppComponent,
        ListSentencesComponent,
        SentenceDetailComponent,
        PageNotFoundComponent,
        ChildSentenceAddComponent,
        ChildSentenceEditComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgxPaginationModule,
        FontAwesomeModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private library: FaIconLibrary) {
        library.addIcons(faHome, faDoorOpen, faSearch);
    }
}
