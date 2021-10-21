const databaseHandler = require('../Common/DatabaseHandler')
const sentenceMapper = require('../ObjectMapper/SentenceMapper');
const constant = require('../Common/Constant');
const dbHandler = new databaseHandler()
const collectionName = "sentence_list";

/**
 * find all sentence in database
 * @returns A array of sentences
 */
async function findAllSentenceDAO(searchStr, searchType){
    try {
        var cursor
        //When search is undefince or null or rỗng
        if(!searchStr){
            searchStr="";
        }
        await dbHandler.openConection();
        switch (searchType) {
            case constant.SENTENCE_TYPE_SEARCH:
                cursor = await dbHandler.client.db().collection(collectionName).find({note: {$regex: ".*" + searchStr + ".*", $options: 'i' }});//option: "i" insensitive
                break;
            case constant.MEANING_TYPE_SEARCH:
                cursor = await dbHandler.client.db().collection(collectionName).find({meaning: {$regex: ".*" + searchStr + ".*", $options: 'i' }});//option: "i" insensitive
                break;
            case constant.GRAMMAR_TYPE_SEARCH:
                cursor = await dbHandler.client.db().collection(collectionName).find({grammar: {$regex: ".*" + searchStr + ".*", $options: 'i' }});//option: "i" insensitive
                break;
            case constant.DESCRIPTION_TYPE_SEARCH:
                cursor = await dbHandler.client.db().collection(collectionName).find({description: {$regex: ".*" + searchStr + ".*", $options: 'i' }});//option: "i" insensitive
                break;
            case constant.NOTE_TYPE_SEARCH:
                cursor = await dbHandler.client.db().collection(collectionName).find({note: {$regex: ".*" + searchStr + ".*", $options: 'i' }});//option: "i" insensitive
                break;
            default:
                cursor = await dbHandler.client.db().collection(collectionName).find({note: {$regex: ".*" + searchStr + ".*", $options: 'i' }});//option: "i" insensitive
        }
        var results = await cursor.toArray();

        if(results.length > 0 ) {
            results.forEach((item, i) => {
                sentenceMapper(item);
                console.log(`sentences ${i}`);
                console.log(JSON.stringify(item));
        });
        } else {
            console.log("Can't find anything");
        }
    return results;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection()
    }
}

/**
 * Search sentence by id
 * @param {id of the sentence} _id  
 * @returns sentence has corresponds id
 */
async function findSentenceByIdDAO(_id){
    try {
        await dbHandler.openConection();

        const result = await dbHandler.client.db().collection(collectionName).findOne({id: _id});
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

/**
 * Check existence of a sentence 
 * @param {*} _id 
 * @returns 
 */
async function isExistIdDAO(_id){
    try {
        await dbHandler.openConection();

        const result = await dbHandler.client.db().collection(collectionName).find({id: _id}, {$exists: true}).toArray();
        if(result.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

async function updatSentenceDAO(sentence){
    try {
        await dbHandler.openConection();

        const result = await dbHandler.client.db().collection(collectionName).updateOne({id: parseInt(sentence.id)}, {$set: {
                    firstSentence: sentence.firstSentence,
                    coloredSentence: sentence.coloredSentence,
                    lastSentence: sentence.lastSentence,
                    coloredSentenceOption: sentence.coloredSentenceOption,
                    lastSentenceOption: sentence.lastSentenceOption,
                    meaning: sentence.meaning,
                    grammar: sentence.grammar,
                    description: sentence.description,
                    note: sentence.note
                }}
            );
        return result;
    } catch (error) {
        console.log(error);        
    } finally {
        await dbHandler.closeConnection();
    }
}

async function addSentenceDao(sentence){
    try {
        await dbHandler.openConection();

        const result = await dbHandler.client.db().collection(collectionName).insertOne({
            id: parseInt(sentence.id),
            firstSentence: sentence.firstSentence,
            coloredSentence: sentence.coloredSentence,
            lastSentence: sentence.lastSentence,
            coloredSentenceOption: sentence.coloredSentenceOption,
            lastSentenceOption: sentence.lastSentenceOption,
            meaning: sentence.meaning,
            grammar: sentence.grammar,
            description: sentence.description,
            note: sentence.note
        })
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection()
    }
}

async function getMaxIdSentenceDAO(){
    try {
        await dbHandler.openConection();

        const result = await dbHandler.client.db().collection(collectionName).find().sort({id: -1}).limit(1).toArray();
        return result[0].id;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

async function deleteSentenceDAO(_id){
    try {
        await dbHandler.openConection();
        const result = await dbHandler.client.db().collection(collectionName).deleteOne({id: _id});
        console.log(result.deletedCount);
        return result;
    } catch (error) {
        console.log(error)
    } finally {
        await dbHandler.closeConnection();
    }
}

module.exports = {findAllSentenceDAO, findSentenceByIdDAO, isExistIdDAO, updatSentenceDAO, addSentenceDao, getMaxIdSentenceDAO, deleteSentenceDAO}