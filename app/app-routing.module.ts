import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NextPreviousSentenceGuard } from './guard/next-previous-sentence.guard';
import { ListSentencesComponent } from './list-sentences/list-sentences.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SentenceDetailComponent } from './sentence-detail/sentence-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/sentences', pathMatch:'full'},
  {path: 'sentences', component: ListSentencesComponent},
  {path: 'sentences/detail/:id' , component: SentenceDetailComponent, canActivate:[NextPreviousSentenceGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  //Vừa import vừa export giúp cho khi lấy AppRoutingModule ra dùng thì ko cần phải import lại nữa (bài 27)
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
