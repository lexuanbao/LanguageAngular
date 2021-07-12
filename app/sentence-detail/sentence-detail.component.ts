import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sentences } from '../database';

@Component({
  selector: 'app-sentence-detail',
  templateUrl: './sentence-detail.component.html',
  styleUrls: ['./sentence-detail.component.css']
})
export class SentenceDetailComponent implements OnInit {

  data;
  sentence;
  highlightFlag = false;
  meaningFlag = false;
  grammarFlag = false;

  constructor(private route: ActivatedRoute) {
    this.data = sentences;
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.sentence = this.data.filter(item => item.id == id)[0];
  }

  btnHighlightOnclick() {

  }

  btnMeaningOnclick() {

  }

  btnGrammarOnclick() {

  }
}
