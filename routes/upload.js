const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const Pusher = require('pusher');
const bodyParser = require('body-parser')
const multer = require('multer');
const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

mongoose.connect('mongodb://localhost/BigBlueDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('we\'re connected!');
});


/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://collinsnyamao:<password>@cluster0.p8hm6.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});*/


const checksumSchema = new mongoose.Schema({
    filename: String,
    user: String,
    checksum: String,
    dateTime: String,
    extension: String,
    status: Boolean
});

const ChecksumModel = mongoose.model('ChecksumModel', checksumSchema);


db.once('open', () => {

    /*const checksumWatcher = db.collection('checksummodels');
    const changeStream = checksumWatcher.watch();

    changeStream.on('change', (change) => {
        console.log(change);

        if (change.operationType === 'insert') {
            const task = change.fullDocument;

        } else if (change.operationType === 'delete') {

        } else if (change.operationType === 'update') {

        } else if (change.operationType === 'replace') {

        }
    });*/
})


function findChecksum(checksum) {
    Checksum.find({checksum: checksum})
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
}

function createChecksum(filename, user, checksum, dateTime, extension, status) {
    const newChecksum = new ChecksumModel({
        filename: filename,
        user: user,
        checksum: checksum,
        dateTime: dateTime,
        extension: extension,
        status: status
    });
    newChecksum
        .save(newChecksum)
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        });
}

function clearDB() {
    ChecksumModel.deleteMany({}, function (err) {
        console.log('collection Cleared');
        return 'collection cleared';
    });
}

function getChecksumValue(filename) {
    const hash = crypto.createHash('md5'),
        stream = fs.createReadStream(__dirname + '/../upload/temp/' + filename);

    stream.on('data', function (data) {
        hash.update(data, 'utf8')
    })

    stream.on('end', function () {
        return hash.digest('hex')
    })
}


function getBankFolder(bankname) {
    switch (bankname) {
        case 'consolidated bank ltd.':
            return 'consolidated';
        case 'equity bank ltd.':
            return 'equity';
        case 'standard chartered bank.':
            return 'standard';
        case 'mpesa statement.':
            return 'mpesa';
        case 'stanbic bank kenya.':
            return 'stanbic';
        case 'gulf african bank.':
            return 'gulf';
        case 'national bank of kenya.':
            return 'national';
        default:
            return 'unsorted';
    }
}

/*createChecksum('123.xyz','acd1324sjx','5h5i4494j5','098292','xyz',false);*/

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/*SET STORAGE*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage: storage});

/*SET STORAGE*/

router.post('/new', function (req, res) {
    const user = 'user1' + '*';
    const userID = req.headers.id;
    const userfile = req.body.fileWrite;
    console.log('++++++++++++++++++++++++++++ [ ', userID, ' ] +++++++++++++++++++++++++++++++++');

    const busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log('++++++++++++++++++++++++++++ [ file received ] +++++++++++++++++++++++++++++++++');
        console.log('NEW FILE : ' + userID + filename);

        let ext = "." + filename.toLowerCase().split('.').pop();
        console.log('EXTENSION : ', ext)
        let setFileName = userID + ext;
        console.log('NEW FILE NAME : ', setFileName)

        console.log('++++++++++++++++++++++++++++ [ WRITING FILE TO TEMP ] +++++++++++++++++++++++++++++++++');
        const saveTo = path.join(__dirname, '/../upload/temp/' + setFileName);
        console.log(1);
        console.log('MIME TYPE : ' + mimetype, '\rENCODING : ' + encoding, '\r BANK NAME : ' + fieldname);
        file.pipe(fs.createWriteStream(saveTo));
        busboy.on('finish', function () {

            console.log('++++++++++++++++++++++++++++ [ file write finished ] +++++++++++++++++++++++++++++++++');

            console.log('FILENAME : ', filename);


            console.log('++++++++++++++++++++++++++++ [ Hashing file ] +++++++++++++++++++++++++++++++++');
            const hash = crypto.createHash('md5'),
                stream = fs.createReadStream(__dirname + '/../upload/temp/' + setFileName);
            console.log(2);

            stream.on('data', function (data) {
                hash.update(data, 'utf8')
            })
            console.log('++++++++++++++++++++++++++++ [ hashing complete ] +++++++++++++++++++++++++++++++++');

            stream.on('end', function () {
                console.log();
                let checksumValue = hash.digest('hex');


                console.log('CHECKSUM :', checksumValue);

                ChecksumModel.find({checksum: checksumValue}, function (err, document) {

                    if (err) {
                        console.log('error');
                        res.send('error');
                    }

                    console.log(' ', document.length);

                    if (document.length === 0) {
                        console.log('no data found');
                        let newChecksum = new ChecksumModel({
                            filename: setFileName,
                            user: user,
                            checksum: checksumValue,
                            dateTime: Date.now(),
                            extension: mimetype,
                            status: false
                        })
                            .save()
                            .then(function () {
                                console.log('saved...');
                                res.send('file saved');
                                /*save file*/
                                fs.rename(__dirname + '/../upload/temp/' + setFileName, __dirname + '/../upload/passed/' + setFileName, function (err) {
                                    if (err) throw err;
                                    console.log('++++++++++++++++++++++++++++ [ file pass complete ] +++++++++++++++++++++++++++++++++');
                                });

                            })
                            .catch(function (err) {
                                console.log(err);
                                res.send('error found ');
                            });

                    } else {
                        res.send('file exists');
                        console.log(setFileName + ' exists');
                    }

                })

            });

        });
    });


    return req.pipe(busboy);


});

router.post('/nifi', function (req, res) {
    let ingestionFilename = req.body.filename;
    let ingestionStatus = req.body.status;

    let query = {filename: ingestionFilename};
    ChecksumModel.findOneAndUpdate({filename: ingestionFilename}, {status: ingestionStatus}, {useFindAndModify: false}, function (err, doc) {
        if (err) console.log(err);
        res.send(doc);
    });

});

router.post('/nifiMedia', function (req, res) {
    let ingestionFilename = req.body.filename;
    let ingestionStatus = req.body.status;

    let query = {filename: ingestionFilename};
    ChecksumModel.findOneAndUpdate({filename: ingestionFilename}, {status: ingestionStatus}, {useFindAndModify: false}, function (err, doc) {
        if (err) console.log(err);
        res.send(doc);
    });

});


router.post('/checker', function (req, res) {

    const user = 'user1' + '*';
    let filename = req.body.filename;
    let filename2 = req.body.filename;
    console.log(filename2);

    ChecksumModel.findOne({filename: filename2}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});


router.post('/financial', function (req, res) {


    let fileFullName = req.headers.extension;
    console.log('FILE SHORT NAME : ', fileFullName);

    const busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log('BANK NAME :', fieldname);
        let ext = "." + filename.toLowerCase().split('.').pop();
        console.log('EXTENSION : ', ext)
        let setFileName = fileFullName + ext;
        let userstr = fileFullName.split('*');
        let user = userstr[0];

        console.log('++++++++++++++++++++++++++++ [ writing file to bank folder ] +++++++++++++++++++++++++++++++++');
        const saveTo = path.join(__dirname + '/../upload/financialTemp/' + setFileName);
        console.log('MIME TYPE : ' + mimetype, '\rENCODING : ' + encoding, '\r BANK NAME : ' + fieldname);
        file.pipe(fs.createWriteStream(saveTo));
        busboy.on('finish', function () {

            console.log(filename, 'uploaded');
            console.log('++++++++++++++++++++++++++++ [ file write finished ] +++++++++++++++++++++++++++++++++');


            console.log('++++++++++++++++++++++++++++ [ hashing checksum ] +++++++++++++++++++++++++++++++++');

            const hash = crypto.createHash('md5'),
                stream = fs.createReadStream(__dirname + '/../upload/financialTemp/' + setFileName);

            stream.on('data', function (data) {
                hash.update(data, 'utf8')
            })

            stream.on('end', function () {
                console.log('++++++++++++++++++++++++++++ [ checksum generated ] +++++++++++++++++++++++++++++++++');
                let checksumValue = hash.digest('hex');
                console.log('CHECKSUM : ', checksumValue);

                console.log('++++++++++++++++++++++++++++ [ saving to db ] +++++++++++++++++++++++++++++++++');

                ChecksumModel.find({checksum: checksumValue}, function (err, document) {

                    if (err) {
                        console.log('error');
                        res.send('error');
                    }

                    console.log('DATA SIZE : ', document.length);

                    if (document.length === 0) {
                        console.log('no data found');
                        let newChecksum = new ChecksumModel({
                            filename: setFileName,
                            user: user,
                            checksum: checksumValue,
                            dateTime: Date.now(),
                            extension: mimetype,
                            status: false
                        })
                            .save()
                            .then(function () {
                                console.log('++++++++++++++++++++++++++++ [ SAVED ] +++++++++++++++++++++++++++++++++');
                                res.send('file saved');
                                fs.rename(__dirname + '/../upload/financialTemp/' + setFileName, __dirname + '/../upload/financialMain/' + getBankFolder(fieldname.toLowerCase()) + '/' + setFileName, function (err) {
                                    if (err) throw err;
                                    console.log('++++++++++++++++++++++++++++ [ file pass complete ] +++++++++++++++++++++++++++++++++');
                                });
                            })
                            .catch(function (err) {
                                console.log('----------------------------------------------------------\r', err);
                                res.send('error found ');
                            });

                    } else {
                        res.send('file exists');
                        console.log('exists');
                    }

                })

            });

        });
    });


    return req.pipe(busboy);
});

/*console.log(crypto.getHashes());*/
/*console.log(__dirname);*/

router.post('/clearDB', function (req, res) {
    const password = req.body.password;
    if (password === 'tintin') {
        ChecksumModel.deleteMany({}, function (err) {
            if (err) res.send('not cleared');
            res.send('cleared')
        });
    } else {
        res.send('wrong password');
    }
});

module.exports = router;
