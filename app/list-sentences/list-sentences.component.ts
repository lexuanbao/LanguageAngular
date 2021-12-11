import { Component, OnInit } from '@angular/core';
import { common } from '../helper/common';
import { SentenceService } from '../service/sentence.service';
import { SentenceEntity } from '../Entities/SentenceEntity'
import { SentenceCommon } from '../helper/SentenceCommon'
import { searchTypeArray } from '../helper/fixed-database';

@Component({
    selector: 'app-list-sentences',
    templateUrl: './list-sentences.component.html',
    styleUrls: ['./list-sentences.component.scss']
})
export class ListSentencesComponent implements OnInit {
    //Params of handling sentences
    //sentences: SentenceEntity[] = []; // Array of sentence

    //Params of search function and pagination
    p: number;
    searchType: number;
    listSearchType = searchTypeArray;

    constructor(public sentenceService: SentenceService) { }

    ngOnInit(): void {
        this.getSentence();
    }

    getSentence(searchStr = '', searchType = 1) {
        this.sentenceService.getSentences(searchStr, searchType).subscribe(sentences => {
            //Sentence of list-sentences component
            //this.sentences = sentences;
            //General Sentence -> used in sentence-detail
            this.sentenceService.serviceSentences = sentences;
        });
    }

    btnShuffleOnclick() {
        //this.sentenceService.serviceSentences = this.sentences = common.shuffle(this.sentences);
        this.sentenceService.serviceSentences = common.shuffle(this.sentenceService.serviceSentences);
    }

    btnMeaningOnclick(item: SentenceEntity) {
        item.meaningFlag = !item.meaningFlag;
    }

    btnGrammarOnclick(item: SentenceEntity) {
        item.grammarFlag = !item.grammarFlag;
    }

    btnHighlightOnclick(item: SentenceEntity) {
        item.highlightFlag = !item.highlightFlag;
    }

    btnAddOnClick() {
        if (this.sentenceService.editFlag) {
            alert('Please finish your record edit');
            return;
        }
        this.sentenceService.addFlag = !this.sentenceService.addFlag;
    }

    searchButtonOnClick(searchStr: string) {
        this.getSentence(searchStr, this.searchType);
    }

    btnEditOnclick(item: SentenceEntity) {
        if (this.sentenceService.editFlag) {
            alert('Can edit only one record in the moment');
            return;
        }

        if (this.sentenceService.addFlag) {
            alert('Please finish your record registration');
            return;
        }
        //Do this for allowing just one record editing at the time
        this.sentenceService.changeEditFlag();

        //This for showing the input tag
        item.editFlag = !item.editFlag;

        //Get array of chosenSentence from item
        this.sentenceService.chosenSentence = SentenceCommon.changeToChosenSentence(item);
        
        //Set MainSentence for child-edit component
        SentenceEntity.setMainSentence(item);
    }
    
    btnDeleteOnclick(id: number) {
        if (confirm("Are you sure to delete this sentence ?")) {
            this.sentenceService.deleteSentence(id).subscribe();
            this.sentenceService.serviceSentences = this.sentenceService.serviceSentences.filter(item => item.id != id);
            // this.sentenceService.serviceSentences = this.sentences;
        }
    }
}
