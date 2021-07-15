import { Component, OnInit } from '@angular/core';
import { sentences } from '../database';
import { common } from '../helper/common';

@Component({
  selector: 'app-list-sentences',
  templateUrl: './list-sentences.component.html',
  styleUrls: ['./list-sentences.component.css']
})
export class ListSentencesComponent implements OnInit {

  data: any;
  addFlag: boolean = false;

  constructor() {
    this.data = sentences;
  }

  ngOnInit(): void {}

  btnShuffleOnclick() {
    this.data  = common.shuffle(this.data);
  }

  btnMeaningOnclick(id) {
    const found = this.data.find(element => element.id == id);
    found.meaningFlag = common.handleFlag(found.meaningFlag);
  }

  btnGrammarOnclick(id) {
    const found = this.data.find(element => element.id == id);
    found.grammarFlag = common.handleFlag(found.grammarFlag);
  }

  btnHighlightOnclick(id) {
    const found = this.data.find(element => element.id == id);
    found.highlightFlag = common.handleFlag(found.highlightFlag);
  }

  btnAddOnClick(){
    this.addFlag = common.handleFlag(this.addFlag);
  }

  btnChooseOnclick(){

  }

  btnSaveOnclick(){
    this.addFlag = common.handleFlag(this.addFlag);
  }

  btnCancelOnclick(){
    this.addFlag = common.handleFlag(this.addFlag);
  }
}
