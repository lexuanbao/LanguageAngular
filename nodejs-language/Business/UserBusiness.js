const DAO = require('../DAO/UserDao');

const isExistUserName = DAO.isExistUserNameDao;

const checkPassWord = async function(name, password) {
    const user = await DAO.findUserByNameDao(name);
    return user == undefined || user.password != password  ? false : true; 
}

module.exports = {isExistUserName, checkPassWord};
