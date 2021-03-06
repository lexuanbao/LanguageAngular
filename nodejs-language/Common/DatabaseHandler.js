const uri = 'mongodb://localhost:27017/Language';
const MongoClient = require('mongodb').MongoClient;

/**
*A class handles database connection 
*/
module.exports = function databaseHandler(){
    this.client  = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})//Không thể dùng chung 1 kết nối để đóng mở => mỗi lần thực hiện truy vấn phải tạo riêng client
    /**
    *Open database connection
    */
    this.openConection = async function(){
        try {   
            await this.client.connect();
        } catch (error) {
            console.log(error);
        }
    }
    
    /**
    *Close database connection 
    */
    this.closeConnection = async function(){
        try {
            await this.client.close();
        } catch (error) {
            console.log(error);
        }
    }
}