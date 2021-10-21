/**
 * A class support for hightlight function
 */
export class subSentenceEntity {
    public subString: string;
    public start: number;
    public end: number;

    constructor(_subString = '', _start = 0, _end = 0) {
        this.subString = _subString;
        this.start = _start;
        this.end = _end;
    }
}