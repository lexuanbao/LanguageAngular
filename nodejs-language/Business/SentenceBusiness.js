const DAO = require('../DAO/SentencesDao');

const findAllSentence = DAO.findAllSentenceDAO;
const findSentenceById = DAO.findSentenceByIdDAO;
const isExistId = DAO.isExistIdDAO
const updatSentence = DAO.updatSentenceDAO;
const deleteSentence = DAO.deleteSentenceDAO;
const addSentence = async function(sentence) {
    sentence.id = await DAO.getMaxIdSentenceDAO() + 1;
    DAO.addSentenceDao(sentence);
}

module.exports = {findAllSentence, findSentenceById, isExistId, updatSentence, addSentence, deleteSentence};