const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://collinsnyamao:Sonofseed5@cluster0-2fmdl.mongodb.net/BigBlueDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
/*db.once('open', function () {
    // we're connected!
    console.log('we\'re connected!');
});*/

const banksSchema = new mongoose.Schema({
    bankName: String
});

const banksModel = mongoose.model('banksModel', banksSchema);


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/new', function (req, res) {
    let newbank = req.body.bankname;

    new banksModel({
        bankName: newbank
    })
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
});

router.post('/list', function (req, res) {
    banksModel.find({}, function (err, docs) {
        res.send(docs);
    });
});

module.exports = router;
