import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sentences } from '../database';
import { common } from '../helper/common';

@Component({
  selector: 'app-sentence-detail',
  templateUrl: './sentence-detail.component.html',
  styleUrls: ['./sentence-detail.component.css']
})
export class SentenceDetailComponent implements OnInit {

  id;
  data;
  sentence;
  highlightFlag = false;
  meaningFlag = false;
  grammarFlag = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.data = sentences;
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
  }

  ngOnInit(): void {
    this.sentence = this.data.filter(item => item.id == this.id)[0];
  }

  btnHighlightOnclick() {
    this.highlightFlag = common.handleFlag(this.highlightFlag);
  }

  btnMeaningOnclick() {
    this.meaningFlag = common.handleFlag(this.meaningFlag);
  }

  btnGrammarOnclick() {
    this.grammarFlag = common.handleFlag(this.grammarFlag);
  }

  btnNextOnclick(){
    if(this.id + 1 <= this.data.length) {
      this.id = this.id + 1;
      this.sentence = this.data.filter(item => item.id == this.id)[0];
      this.router.navigateByUrl(`/sentences/detail/${this.id}`);
    } else {
      alert('Max page!')
    }
  }

  btnPreviousOnclick(){
    if(this.id > 1) {
      this.id = this.id - 1;
      this.sentence = this.data.filter(item => item.id == this.id)[0];
      this.router.navigateByUrl(`/sentences/detail/${this.id}`);
    } else {
      alert('Out of page!')
    }
  }
}
