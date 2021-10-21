import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SentenceEntity } from '../Entities/SentenceEntity';

@Injectable({
  providedIn: 'root'
})
export class SentenceService {

  serviceSentences;
  editingFlag: boolean = false; //Check record being edited

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  url = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  changeEdittingFlag(){
      this.editingFlag = !this.editingFlag;
  }

  getSentences(searchStr, searchType){
    return this.http.get(this.url + `/sentences`, {
      params: {
        searchStr: searchStr,
        searchType: searchType
      }
    });
  }

  updateSentence(sentence){
    return this.http.put(this.url +`/sentences/detail/${sentence.id}/edit`, sentence);
  }

  getSentencesById(id){
    return this.http.get(this.url + `/sentences/detail/${id}`);
  }

  checkExistSentence(id){
    return this.http.get<boolean>(this.url + `/checkExistSentence/${id}`);
  }

  addSentence(sentence: SentenceEntity){
    return this.http.post(this.url + '/sentences/add', sentence);
  }

  deleteSentence(id: number){
    return this.http.delete(this.url + `/sentences/delete/${id}`)
  }
}
