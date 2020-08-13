const express = require('express');
const router = express.Router();
const fs = require('fs');

folderCheck();
function folderCheck() {
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
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
