import { Component, OnInit } from '@angular/core';
import { sentences } from '../database';
import { shuffle } from '../helper/common';

@Component({
  selector: 'app-list-sentences',
  templateUrl: './list-sentences.component.html',
  styleUrls: ['./list-sentences.component.css']
})
export class ListSentencesComponent implements OnInit {

  data;

  constructor() {
    this.data = sentences;
  }

  ngOnInit(): void {
  }

  btnShuffleOnclick() {
    this.data = shuffle(this.data);
  }

  btnMeaningOnclick(id) {
    const found = this.data.find(element => element.id == id);
    if(found.meaningFlag) {
      found.meaningFlag = false;
    } else {
      found.meaningFlag = true;
    }
  }

  btnGrammarOnclick(id) {
    const found = this.data.find(element => element.id == id);
    if(found.grammarFlag) {
      found.grammarFlag = false;
    } else {
      found.grammarFlag = true;
    }
  }

  btnHighlightOnclick(id) {
    const found = this.data.find(element => element.id == id);
    if(found.highlightFlag) {
      found.highlightFlag = false;
    } else {
      found.highlightFlag = true;
    }
  }
}
