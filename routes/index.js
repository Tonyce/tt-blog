var express = require('express');
var router = express.Router();
var article = require('./article.js');
var admin = require('./admin.js');

/* GET home page. */
router.get('/', article.getArticles)
	  // .get('/new-build' , )
	  .get('/findByTitle', article.findByTitle)
	  .get('/deleteArticle', article.deleteArticle)
	  .post('/createArticle', article.createArticle)
	  .post('/createUser', admin.createUser)

	  //接受手机请求
	  .get('/phone', article.phoneGetArticles);

module.exports = router;
