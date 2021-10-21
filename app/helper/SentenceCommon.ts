import { SentenceEntity } from "../Entities/SentenceEntity";
import { subSentenceEntity } from "../Entities/subSentenceEntity";

/**
 * A class handle common action for sentenceObject
 */
export class SentenceCommon{
    /**
     * A function change SentenceEntity object To array Of subSentenceEntity
     * @param sentence : A SentenceEntity object
     * @returns array of subSentenceEntity
     */
    static changeToChosenSentence(sentence: SentenceEntity): subSentenceEntity[]{
        var chosenSentenceArray: subSentenceEntity[] = [];

        //Use this way of binding for not repeating verb "item"
        const { firstSentence, coloredSentence, lastSentence, coloredSentenceOption } = sentence;
        //Case 1: 0 highlight don't need to handle
        if(coloredSentence.length == 0 && coloredSentenceOption.length == 0){
            return chosenSentenceArray;
        }
        //Case 2: 1 highlight
        else if(coloredSentence.length != 0 && coloredSentenceOption.length == 0){
            const subSentence = new subSentenceEntity(coloredSentence, firstSentence.length, firstSentence.length + coloredSentence.length);
            chosenSentenceArray.push(subSentence);
        }
        //Case 3: 2 highlight work for both of case left-right and right-left because reverse of save funcion
        else{
            const firstSubSentence = new subSentenceEntity(coloredSentence, firstSentence.length, firstSentence.length + coloredSentence.length);
            const secondSubSentence = new subSentenceEntity(
                coloredSentenceOption,
                firstSentence.length + coloredSentence.length + lastSentence.length,
                firstSentence.length + coloredSentence.length + lastSentence.length + coloredSentenceOption.length);
            chosenSentenceArray.push(firstSubSentence);
            chosenSentenceArray.push(secondSubSentence);
        }
        return chosenSentenceArray;
    }

    /**
     * A class splits a mainSentence to chosen sentence and pass it to a sentenceObj 
     * supplying: "firstSentence", "coloredSentence", "lastSentence", "coloredSentenceOption", "lastSentenceOption"
     * @param mainSentence A sentence from user's input
     * @param sentenceObj Object is input and also output
     * @param chosenSentenceArray Array contain information about chosenSentence
     * @returns sentenceObj contain all properties, including chosen sentence
     */
    static handleChosenSentenceObject(mainSentence: string, sentenceObj: SentenceEntity, chosenSentenceArray: subSentenceEntity[]): SentenceEntity {
        //Case 1: 0 highlight
        if(chosenSentenceArray.length == 0){
            sentenceObj.firstSentence = mainSentence;
        }
  
        //Case 2: 1 highlight
        else if(chosenSentenceArray.length == 1){
            sentenceObj.firstSentence = mainSentence.substr(0, chosenSentenceArray[0].start);
            sentenceObj.coloredSentence = chosenSentenceArray[0].subString;
            sentenceObj.lastSentence = mainSentence.substr(chosenSentenceArray[0].end);
        }
  
        //Case 3: 2 highlight
        else {
            //Case: Choose from left to right
            if(chosenSentenceArray[1].start > chosenSentenceArray[0].end) {
            sentenceObj.firstSentence = mainSentence.substr(0, chosenSentenceArray[0].start);
            sentenceObj.coloredSentence = chosenSentenceArray[0].subString;
            sentenceObj.lastSentence = mainSentence.substr(chosenSentenceArray[0].end, chosenSentenceArray[1].start - chosenSentenceArray[0].end);
            sentenceObj.coloredSentenceOption = chosenSentenceArray[1].subString;
            sentenceObj.lastSentenceOption = mainSentence.substr(chosenSentenceArray[1].end);
            } 
            //Case: Choose from right to left
            else {
            sentenceObj.firstSentence = mainSentence.substr(0, chosenSentenceArray[1].start);
            sentenceObj.coloredSentence = chosenSentenceArray[1].subString;
            sentenceObj.lastSentence = mainSentence.substr(chosenSentenceArray[1].end, chosenSentenceArray[0].start - chosenSentenceArray[1].end);
            sentenceObj.coloredSentenceOption = chosenSentenceArray[0].subString;
            sentenceObj.lastSentenceOption = mainSentence.substr(chosenSentenceArray[0].end);
            }
        }
        return sentenceObj;
    }
}