import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SentenceService } from '../service/sentence.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Gaurd that prevents invalid id in detail sentence
 */
export class NextPreviousSentenceGuard implements CanActivate {

  result = false;
  constructor(private sentenceService: SentenceService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = route.paramMap.get('id');
    return this.sentenceService.checkExistSentence(id).pipe(
      map(data => {
        this.result = data;
        if(!this.result){
          alert("Out of page!");
        }
        return this.result;
      })
    );
  }
}
