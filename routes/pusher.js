const express = require('express');
const router = express.Router();
const fs = require('fs');

folderCheck();
function folderCheck() {
    if (!fs.existsSync(__dirname+'/../upload/financialMain' )){
        fs.mkdirSync(__dirname+'/../upload/financialMain');
        console.log('missing financial main folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/financialTemp' )){
        fs.mkdirSync(__dirname+'/../upload/financialTemp');
        console.log('missing financial temp folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/financialMain/' + 'consolidated' )){
        fs.mkdirSync(__dirname+'/../upload/financialMain/' + 'consolidated');
        console.log('missing consolidated folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/financialMain/' + 'equity' )){
        fs.mkdirSync(__dirname+'/../upload/financialMain/' + 'equity');
        console.log('missing equity folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/financialMain/' + 'standard' )){
        fs.mkdirSync(__dirname+'/../upload/financialMain/' + 'standard');
        console.log('missing standard folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/financialMain/' + 'mpesa' )){
        fs.mkdirSync(__dirname+'/../upload/financialMain/' + 'mpesa');
        console.log('missing mpesa folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/financialMain/' + 'stanbic' )){
        fs.mkdirSync(__dirname+'/../upload/financialMain/' + 'stanbic');
        console.log('missing stanbic folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/financialMain/' + 'gulf' )){
        fs.mkdirSync(__dirname+'/../upload/financialMain/' + 'gulf');
        console.log('missing gulf folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/financialMain/' + 'national' )){
        fs.mkdirSync(__dirname+'/../upload/financialMain/' + 'national');
        console.log('missing national folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/financialMain/' + 'unsorted' )){
        fs.mkdirSync(__dirname+'/../upload/financialMain/' + 'unsorted');
        console.log('unsorted folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/temp' )){
        fs.mkdirSync(__dirname+'/../upload/temp');
        console.log('temp folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/passed' )){
        fs.mkdirSync(__dirname+'/../upload/passed');
        console.log('passed folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/sample' )){
        fs.mkdirSync(__dirname+'/../upload/sample');
        console.log('sample folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/sample/' + 'csv' )){
        fs.mkdirSync(__dirname+'/../upload/sample/' + 'csv');
        console.log('missing csv sample folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/sample/' + 'excel' )){
        fs.mkdirSync(__dirname+'/../upload/sample/' + 'excel');
        console.log('missing excel sample folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/sample/' + 'microsoftcsvs' )){
        fs.mkdirSync(__dirname+'/../upload/sample/' + 'microsoftcsvs');
        console.log('missing microsoftcsvs sample folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/sample/' + 'other' )){
        fs.mkdirSync(__dirname+'/../upload/sample/' + 'other');
        console.log('missing other sample folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/sample/' + 'sqlDumps' )){
        fs.mkdirSync(__dirname+'/../upload/sample/' + 'sqlDumps');
        console.log('missing sqlDumps sample folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/main' )){
        fs.mkdirSync(__dirname+'/../upload/main');
        console.log('main folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/main/' + 'media' )){
        fs.mkdirSync(__dirname+'/../upload/main/' + 'media');
        console.log('missing media folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/main/' + 'pdf' )){
        fs.mkdirSync(__dirname+'/../upload/main/' + 'pdf');
        console.log('missing pdf main folder created!')
    }
    if (!fs.existsSync(__dirname+'/../upload/main/' + 'text' )){
        fs.mkdirSync(__dirname+'/../upload/main/' + 'text');
        console.log('missing text main folder created!')
    }
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
