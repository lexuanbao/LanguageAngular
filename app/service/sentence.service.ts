import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SentenceEntity } from '../Entities/SentenceEntity';
import { subSentenceEntity } from '../Entities/subSentenceEntity';

@Injectable({
  providedIn: 'root'
})
export class SentenceService {

  serviceSentences: any;
  addFlag: boolean = false; //Check adding
  editFlag: boolean = false; //Check record being edited

  chosenSentence: subSentenceEntity[] = []; // Array of chosenSentences
    
  //Params for subSentenceEntity
  currentStart: number;
  currentEnd: number;
  subString: string;

  url = 'http://localhost:5000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  
  constructor(private http: HttpClient) { }

  changeEditFlag(){
    this.editFlag = !this.editFlag;
  }

  changeAddFlag(){
    this.addFlag = !this.addFlag;
  }

  getSentences(searchStr: string, searchType: number){
    return this.http.get<SentenceEntity[]>(this.url + `/sentences`, {
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
