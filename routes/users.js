var express = require('express');
var router = express.Router();

var admin = require('./admin.js');

/* GET users listing. */
router.get('/', admin.check);
// router.post('/check', admin.check);
router.post('/check', admin.inicheck);//使用配置文件验证
router.post('/create', admin.createUser);

module.exports = router;
