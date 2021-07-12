import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSentencesComponent } from './list-sentences/list-sentences.component';
import { SentenceDetailComponent } from './sentence-detail/sentence-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/sentences', pathMatch:'full'},
  {path: 'sentences', component: ListSentencesComponent},
  {path: 'sentences/detail/:id' , component: SentenceDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
