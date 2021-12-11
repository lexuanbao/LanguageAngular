const express = require('express');
const app = express();
const cors = require('cors');
const sentence = require('../Business/SentenceBusiness');
const user = require('../Business/UserBusiness')

app.use(cors({ origin: ["http://localhost:4200"], credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "vash")

app.get('/sentences', async function (req, res) {
    var searchStr = req.query.searchStr;
    var searchType = req.query.searchType;
    const result = await sentence.findAllSentence(searchStr, searchType);
    res.send(result);
})


app.get('/sentences/detail/:id', async function (req, res) {
    const id = parseInt(req.params.id);
    const result = await sentence.findSentenceById(id);
    res.json(result);
})

app.get('/checkExistSentence/:id', async function (req, res) {
    const id = parseInt(req.params.id);
    const result = await sentence.isExistSentence(id);
    res.json(result);
})

app.put('/sentences/detail/:id/edit', async function (req, res) {
    const body = req.body;
    const result = await sentence.updatSentence(body);
    res.json(result);
})

app.post('/sentences/add', async function (req, res) {
    const body = req.body;
    const result = await sentence.addSentence(body);
    res.json(result);
})

app.delete('/sentences/delete/:id', async function (req, res) {
    const id = parseInt(req.params.id);
    const result = await sentence.deleteSentence(id);
    res.json(result);
})

app.post('/user/login', async function (req, res) {
    const body = req.body;
    const result = await user.checkPassWord(body.userName, body.password);
    res.json(result);
})

var server = app.listen(5000, function () {
    console.log('Node server in locall: 5000 is running..');
});
