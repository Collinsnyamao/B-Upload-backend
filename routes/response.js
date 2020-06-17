const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const chokidar = require('chokidar');
const fs = require('fs');

const watcher = chokidar.watch(__dirname + '/../upload/temp/', {ignored: /^\./, persistent: true});

function movefile(originFile, destination, filename) {
    fs.rename(__dirname + '/../upload/temp/' + originFile, __dirname + '/../upload/main/' + destination + '/' + filename, (err) => {
        if (err) throw err;
        console.log('Rename complete!');
    });
}

watcher
    .on('add', function (path) {

        const fileIndex = path.lastIndexOf('/') + 1;
        const fileFullName = path.substr(fileIndex);
        const filePureName = fileFullName.split('.')[0];
        const fileExt = fileFullName.split('.')[1].toLowerCase();
        console.log('File', fileFullName, 'has been added');

        console.log(__dirname);

        switch (fileExt) {
            case 'jpg':
                movefile(fileFullName, 'media', fileFullName);
                break;
            case 'png':
                movefile(fileFullName, 'media', fileFullName);
                break;
            /*case 'mp4':
                movefile(fileFullName, 'media', fileFullName);
                break;*/
            case 'jpeg':
                movefile(fileFullName, 'media', fileFullName);
                break;
            /*case 'mp3':
                movefile(fileFullName, 'media', fileFullName);
                break;*/
            /*case 'mov':
                movefile(fileFullName, 'media', fileFullName);
                break;*/
            case 'csv':
                movefile(fileFullName, 'csv', fileFullName);
                break;
            case 'xls':
                movefile(fileFullName, 'excel', fileFullName);
                break;
            case 'pdf':
                movefile(fileFullName, 'pdf', fileFullName);
                break;
            case 'txt':
                movefile(fileFullName, 'text', fileFullName);
                break;
            case 'xlsx':
                movefile(fileFullName, 'excel', fileFullName);
                break;
            /*case 'xlsm':
                movefile(fileFullName, 'excel', fileFullName);
                break;*/
            /*case 'xlsb':
                movefile(fileFullName, 'excel', fileFullName);
                break;*/
            /*case 'xltx':
                movefile(fileFullName, 'excel', fileFullName);
                break;*/
            /*case 'xml':
                movefile(fileFullName, 'excel', fileFullName);
                break;*/
            case 'doc':
                movefile(fileFullName, 'text', fileFullName);
                break;
            case 'docx':
                movefile(fileFullName, 'text', fileFullName);
                break;
            case 'bzip':
                movefile(fileFullName, 'compressed', fileFullName);
                break;
            case 'gzip':
                movefile(fileFullName, 'compressed', fileFullName);
                break;
            case 'gz':
                movefile(fileFullName, 'compressed', fileFullName);
                break;
            case 'sql':
                movefile(fileFullName, 'compressed', fileFullName);
                break;
            case 'bzip2':
                movefile(fileFullName, 'compressed', fileFullName);
                break;
            case 'pigz':
                movefile(fileFullName, 'compressed', fileFullName);
                break;
            default:
                movefile(fileFullName, 'other', fileFullName);
        }

    })
    .on('change', function (path) {
        console.log('File', path, 'has been changed');
    })
    .on('unlink', function (path) {
        console.log('File', path, 'has been removed');
    })
    .on('error', function (error) {
        console.error('Error happened', error);
    });


module.exports = router;
