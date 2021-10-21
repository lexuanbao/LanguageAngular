/**
 * A class represents for sentence
 */
export class SentenceEntity {
    id?: number;
    firstSentence?: string;
    coloredSentence?: string;
    lastSentence?: string;
    coloredSentenceOption?: string;
    lastSentenceOption?: string;
    meaning?: string;
    grammar?: string;
    description?: string;
    note?: string;
    highlightFlag?: boolean;
    grammarFlag?: boolean;
    meaningFlag?: boolean;
    editFlag?: boolean;
    mainSentence: string;

    constructor(
        id: number = 1,
        firstSentence: string = "",
        coloredSentence: string = "",
        lastSentence: string = "",
        coloredSentenceOption: string = "",
        lastSentenceOption: string = "",
        meaning: string = "",
        grammar: string = "",
        description: string = "",
        note: string = "",
        highlightFlag: boolean = false,
        grammarFlag: boolean = false,
        meaningFlag: boolean = false,
        editFlag: boolean = false,
    ){
        this.id = id;
        this.firstSentence = firstSentence;
        this.coloredSentence = coloredSentence;
        this.lastSentence = lastSentence;
        this.coloredSentenceOption = coloredSentenceOption;
        this.lastSentenceOption = lastSentenceOption;
        this.meaning = meaning;
        this.grammar = grammar;
        this.description = description;
        this.note = note;
        this.highlightFlag = highlightFlag;
        this.grammarFlag = grammarFlag;
        this.meaningFlag = meaningFlag;
        this.editFlag = editFlag;
    }
}