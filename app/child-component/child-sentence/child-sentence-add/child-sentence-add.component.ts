import { Component, OnInit } from '@angular/core';
import { SentenceEntity } from 'src/app/Entities/SentenceEntity';
import { subSentenceEntity } from 'src/app/Entities/subSentenceEntity';
import { SentenceCommon } from 'src/app/helper/SentenceCommon';
import { SentenceService } from '../../../service/sentence.service';

@Component({
  selector: '[child-sentence-add]',
  templateUrl: './child-sentence-add.component.html',
  styleUrls: ['./child-sentence-add.component.scss']
})
export class ChildSentenceAddComponent implements OnInit {

  constructor(public sentenceService: SentenceService) {}

  ngOnInit(): void {
  }

  select(event: any) {
    this.sentenceService.currentStart = event.target.selectionStart;
    this.sentenceService.currentEnd = event.target.selectionEnd;
    this.sentenceService.subString = event.target.value.substr(this.sentenceService.currentStart, this.sentenceService.currentEnd - this.sentenceService.currentStart);
  }

  btnChooseOnclick() {
    if (this.sentenceService.chosenSentence.length == 2) {
        alert('Max of chosen sentences, need clear and choose again');
        return;
    }
    const subSentence = new subSentenceEntity(this.sentenceService.subString, this.sentenceService.currentStart, this.sentenceService.currentEnd);
    this.sentenceService.chosenSentence.push(subSentence);
  }

  clearChosenSentences() {
    this.sentenceService.chosenSentence = [];
  }


  btnDeleteOnclick(id: number) {
    if (confirm("Are you sure to delete this sentence ?")) {
        this.sentenceService.deleteSentence(id).subscribe();
        this.sentenceService.serviceSentences = this.sentenceService.serviceSentences.filter(item => item.id != id);
        // this.sentenceService.serviceSentences = this.sentences;
    }
  }

  btnSaveOnClick(_sentence: string, _meaning: string, _grammar: string, _description: string, _note: string) {
    this.sentenceService.addFlag = false;
    var sentenceObj = new SentenceEntity();
    sentenceObj.meaning = _meaning;
    sentenceObj.grammar = _grammar;
    sentenceObj.description = _description;
    sentenceObj.note = _note;

    //Handle hightlight sentence of object
    sentenceObj = SentenceCommon.handleChosenSentenceObject(_sentence, sentenceObj, this.sentenceService.chosenSentence);
    this.sentenceService.addSentence(sentenceObj).subscribe(() => this.sentenceService.serviceSentences.push(sentenceObj));
  }

  btnCancelOnClick() {
    this.sentenceService.addFlag = false;
  }
}
