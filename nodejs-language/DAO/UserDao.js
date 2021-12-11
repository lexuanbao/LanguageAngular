const databaseHandler = require('../Common/DatabaseHandler')
const constant = require('../Common/Constant');
const dbHandler = new databaseHandler()
const collectionName = "user_list";

async function findUserByNameDao(_name){
    try {
        await dbHandler.openConection();
        const result = await dbHandler.client.db().collection(collectionName).findOne({userName : _name});
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

async function isExistUserNameDao(name){
    try {
        await dbHandler.openConection();
        const result = await dbHandler.client.db().collection(collectionName).find({userName: _name}, {$exists: true}).toArray();
        return result.length > 0 ? true : false;
    } catch (error) {
        console.log(error);
    } finally {
        await dbHandler.closeConnection();
    }
}

module.exports = {findUserByNameDao, isExistUserNameDao};