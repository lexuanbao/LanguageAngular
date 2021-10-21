/**
 * Add more properties for sentence object
 * @param {Sentence} object of sentence 
 * @returns a sentence that added: highlightFlag, grammarFlag, meaningFlag
 */
module.exports = function Mapping(object){
    object.highlightFlag = false;
    object.grammarFlag = false;
    object.meaningFlag = false;
    object.editFlag = false;
    return object;
}