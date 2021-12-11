const DAO = require('../DAO/SentencesDao');

const findAllSentence = DAO.findAllSentenceDAO;
const findSentenceById = DAO.findSentenceByIdDAO;
const isExistSentence = DAO.isExistSentenceDAO
const updatSentence = DAO.updatSentenceDAO;
const deleteSentence = DAO.deleteSentenceDAO;
const addSentence = async function(sentence) {
    sentence.id = await DAO.getMaxIdSentenceDAO() + 1;
    DAO.addSentenceDao(sentence);
}

module.exports = {findAllSentence, findSentenceById, isExistSentence, updatSentence, addSentence, deleteSentence};