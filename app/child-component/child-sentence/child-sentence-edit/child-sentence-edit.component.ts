import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { of } from 'rxjs';
import { SentenceEntity } from 'src/app/Entities/SentenceEntity';
import { subSentenceEntity } from 'src/app/Entities/subSentenceEntity';
import { SentenceCommon } from 'src/app/helper/SentenceCommon';
import { SentenceService } from '../../../service/sentence.service';

@Component({
  selector: '[child-sentence-edit]',
  templateUrl: './child-sentence-edit.component.html',
  styleUrls: ['./child-sentence-edit.component.css']
})
export class ChildSentenceEditComponent implements OnInit {

  @Input() sentence: SentenceEntity;
  @Output() changeChild = new EventEmitter();

  //Params for subSentenceEntity
  currentStart: number;
  currentEnd: number;
  subString: string;

  //Array of chosenSentences
  chosenSentence: subSentenceEntity[] = [];

  constructor(private sentenceService: SentenceService) {}

  ngOnInit(): void {
    //Get array of chosenSentence from item
    this.chosenSentence = SentenceCommon.changeToChosenSentence(this.sentence);
  }

  /**
   * Handle position selection event in view
   * @param event 
   */
  select(event) {
    this.currentStart = event.target.selectionStart;
    this.currentEnd = event.target.selectionEnd;
    this.subString = event.target.value.substr(this.currentStart, this.currentEnd - this.currentStart);
 }

 
  btnChooseOnclick(){
    if(this.chosenSentence.length == 2) {
      alert('Max of chosen sentences, need clear and choose again !');
      return;
    }
    const subSentence = new subSentenceEntity(this.subString, this.currentStart, this.currentEnd);
    this.chosenSentence.push(subSentence);
    //Output
    this.changeChild.emit({chosenSentence: this.chosenSentence});
  }

  btnSaveOnclick(){
    //Change editFlag of current Object
    this.sentence.editFlag = !this.sentence.editFlag;
    //Create object
    var sentenceObj = new SentenceEntity();

    sentenceObj.id = this.sentence.id;
    sentenceObj.meaning = this.sentence.meaning;
    sentenceObj.grammar = this.sentence.grammar;
    sentenceObj.description = this.sentence.description;
    sentenceObj.note = this.sentence.note;
    this.sentence.firstSentence = this.sentence.mainSentence;

    // sentenceObj = SentenceCommon.handleChosenSentenceObject(this.sentence.mainSentence, sentenceObj, this.chosenSentence);

    this.sentenceService.changeEdittingFlag();
    // this.sentenceService.updateSentence(sentenceObj).subscribe(() => {this.changeChild.emit({reloadFlag: true})});//không emit đc?
    this.sentenceService.updateSentence(sentenceObj).subscribe();
  }

  clearChosenSentences(){
    this.chosenSentence = [];
    this.changeChild.emit({chosenSentence: this.chosenSentence});
  }

  btnCancelOnclick(item){
    //Do this for allowing another record to edit
    item.editFlag = !item.editFlag;
    this.sentenceService.changeEdittingFlag();
  }

  haha(haha){

  }
}
