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

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/nifi',function (req,res){
    let ingestionFilename = req.body.filename;
    let ingestionStatus = req.body.status;

    let query = { filename: ingestionFilename };

});

router.post('/nifiMedia',function (req,res){

});

module.exports = router;
