import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListSentencesComponent } from './list-sentences/list-sentences.component';
import { SentenceDetailComponent } from './sentence-detail/sentence-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ListSentencesComponent,
    SentenceDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
