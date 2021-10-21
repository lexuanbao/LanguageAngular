import { Component, OnInit } from '@angular/core';
import { common } from '../helper/common';
import { SentenceService } from '../service/sentence.service';
import { SentenceEntity } from '../Entities/SentenceEntity'
import { subSentenceEntity } from '../Entities/subSentenceEntity';
import { SentenceCommon } from '../helper/SentenceCommon'
import { searchTypeArray } from '../helper/fixed-database';

@Component({
    selector: 'app-list-sentences',
    templateUrl: './list-sentences.component.html',
    styleUrls: ['./list-sentences.component.scss']
})
export class ListSentencesComponent implements OnInit {
    //Params of handling sentences
    sentences: any = []; // Array of sentence
    addFlag: boolean = false;
    chosenSentence: subSentenceEntity[] = []; // Array of chosenSentences
    
    //Params for subSentenceEntity
    currentStart: number;
    currentEnd: number;
    subString: string;

    //Params of search function and pagination
    p: number;
    searchType: number;
    listSearchType = searchTypeArray;

    constructor(private sentenceService: SentenceService) { }

    ngOnInit(): void {
        this.getSentence();
    }

    getSentence(searchStr = '', searchType = 1) {
        this.sentenceService.getSentences(searchStr, searchType).subscribe(sentences => {
            //Sentence of list-sentences component
            this.sentences = sentences;
            //General Sentence -> used in sentence-detail
            this.sentenceService.serviceSentences = sentences;
        });
    }

    btnShuffleOnclick() {
        this.sentenceService.serviceSentences = this.sentences = common.shuffle(this.sentences);
    }

    btnMeaningOnclick(item) {
        item.meaningFlag = !item.meaningFlag;
    }

    btnGrammarOnclick(item) {
        item.grammarFlag = !item.grammarFlag;
    }

    btnHighlightOnclick(item) {
        item.highlightFlag = !item.highlightFlag;
    }

    btnEditOnclick(item) {
        if (this.sentenceService.editingFlag) {
            alert('Can edit only one record in the moment');
            return;
        }
        //Do this for allowing just one record editing at the time
        this.sentenceService.changeEdittingFlag();
        //This for showing the input tag
        item.editFlag = !item.editFlag;

        //Get array of chosenSentence from item
        this.chosenSentence = SentenceCommon.changeToChosenSentence(item);

        // item.mainSentence = item.firstSentence + item.coloredSentence + item.lastSentence + item.coloredSentenceOption + item.lastSentenceOption;
    }

    btnSaveOnclick(_id: number, _sentence: string, _meaning: string, _grammar: string, _description: string, _note: string, _editFlag: boolean) {
        //Change editFlag of current Object
        _editFlag = !_editFlag;
        //Do this for allowing another record to edit
        this.sentenceService.changeEdittingFlag();

        //Create object
        var sentenceObj = new SentenceEntity();
        sentenceObj.id = _id;
        sentenceObj.meaning = _meaning;
        sentenceObj.grammar = _grammar;
        sentenceObj.description = _description;
        sentenceObj.note = _note;

        sentenceObj = SentenceCommon.handleChosenSentenceObject(_sentence, sentenceObj, this.chosenSentence);
        this.sentenceService.updateSentence(sentenceObj).subscribe(() => this.getSentence());
    }

    btnCancelOnclick(item) {
        item.editFlag = !item.editFlag;
        //Do this for allowing another record to edit
        this.sentenceService.changeEdittingFlag();
    }

    searchButtonOnClick(searchStr) {
        this.getSentence(searchStr, this.searchType);
    }

    select(event) {
        this.currentStart = event.target.selectionStart;
        this.currentEnd = event.target.selectionEnd;
        this.subString = event.target.value.substr(this.currentStart, this.currentEnd - this.currentStart);
    }

    btnChooseOnclick() {
        if (this.chosenSentence.length == 2) {
            alert('Max of chosen sentences, need clear and choose again');
            return;
        }
        const subSentence = new subSentenceEntity(this.subString, this.currentStart, this.currentEnd);
        this.chosenSentence.push(subSentence);
    }

    clearChosenSentences() {
        this.chosenSentence = [];
    }

    btnAddOnClick() {
        this.addFlag = !this.addFlag;
    }

    btnAddSaveOnClick(_sentence: string, _meaning: string, _grammar: string, _description: string, _note: string) {
        this.addFlag = false;
        var sentenceObj = new SentenceEntity();
        sentenceObj.meaning = _meaning;
        sentenceObj.grammar = _grammar;
        sentenceObj.description = _description;
        sentenceObj.note = _note;

        //Handle hightlight sentence of object
        sentenceObj = SentenceCommon.handleChosenSentenceObject(_sentence, sentenceObj, this.chosenSentence);
        this.sentenceService.addSentence(sentenceObj).subscribe(() => this.sentences.push(sentenceObj));
    }

    btnDeleteOnclick(id: number) {
        if (confirm("Are you sure to delete this sentence ?")) {
            this.sentenceService.deleteSentence(id).subscribe();
            this.sentences = this.sentences.filter(item => item.id != id);
            this.sentenceService.serviceSentences = this.sentences;
        }
    }

    btnAddCancelOnClick() {
        this.addFlag = false;
    }

    changeParent(data) {
        const { editingFlag, chosenSentence, reloadFlag } = data;
        if (chosenSentence) {
            this.chosenSentence = chosenSentence;
        }
        if (reloadFlag) {
            this.getSentence();
        }
    }
}
