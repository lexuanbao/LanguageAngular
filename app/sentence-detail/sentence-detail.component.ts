import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentenceService } from '../service/sentence.service';
import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-sentence-detail',
  templateUrl: './sentence-detail.component.html',
  styleUrls: ['./sentence-detail.component.scss']
})
export class SentenceDetailComponent implements OnInit {
  currenId: any;
  nextId = 2;
  previousId = 0;
  sentence: any;
  currentIndex;
  sentencesArray;

  constructor(
    private route: ActivatedRoute,
    private sentenceService: SentenceService
    ) {
      this.sentence = "";
  }

  ngOnInit(): void {
    //Mặc dù giảm bớt 1 tầng observable nhưng không được dùng snapshot với trường hợp từ page con sang page con khác 
    // Vì snap shot chỉ được khởi tạo 1 lần duy nhât khi vừa vào page con
    // this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
    // this.getSentenceById(this.id);
    //------------------------------------------------

    // this.route.paramMap.subscribe(param => {
    //   this.id = param.get('id');
    //   this.getSentenceById(this.id); //Không được tối ưu vì lồng subcribe
    // })

    //------------------------------------------------
    
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => 
      {
        this.getId(id);
        return this.sentenceService.getSentencesById(id);
      })
    ).subscribe(data => this.sentence = data);
  }

  /**
   * set previousId vs nextId base on currentId to next, previous page function
   * @param currenId 
   */
  async getId(currentId){
    this.currenId = currentId;
    this.sentencesArray = this.sentenceService.serviceSentences;
    this.currentIndex = await this.sentencesArray.findIndex(item => item.id == this.currenId);
    //Case 1: the first element of array
    if(this.currentIndex == 0 ){
      this.previousId = 0;
      this.nextId = this.sentencesArray[this.currentIndex + 1].id;
    }
    //Case 2: the last element of array
    else if(this.currentIndex == this.sentencesArray.length - 1) {
      this.previousId = this.sentencesArray[this.currentIndex - 1].id;
      this.nextId = 0
    }
    //Case 3: the normal element of array
    else {
      this.previousId = this.sentencesArray[this.currentIndex - 1].id;
      this.nextId = this.sentencesArray[this.currentIndex + 1].id;
    }
  }

  getSentenceById(id){
    this.sentenceService.getSentencesById(id).subscribe(data => this.sentence = data);
  }

  btnHighlightOnclick() {
    this.sentence.highlightFlag = !this.sentence.highlightFlag;
  }

  btnMeaningOnclick() {
    this.sentence.meaningFlag = !this.sentence.meaningFlag;
  }

  btnGrammarOnclick() {
    this.sentence.grammarFlag = !this.sentence.grammarFlag;
  }
}
