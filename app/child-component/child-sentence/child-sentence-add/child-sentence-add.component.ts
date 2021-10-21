import { Component, OnInit } from '@angular/core';
import { SentenceService } from '../../../service/sentence.service';

@Component({
  selector: 'child-sentence-add',
  templateUrl: './child-sentence-add.component.html',
  styleUrls: ['./child-sentence-add.component.css']
})
export class ChildSentenceAddComponent implements OnInit {

  constructor(private sentenceService: SentenceService) {}

  ngOnInit(): void {
  }
}
