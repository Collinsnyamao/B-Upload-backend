let express = require('express');
let router = express.Router();
let health = require('express-ping');


router.get('/', function (req, res) {
    res.send('1');
})



module.exports = router
