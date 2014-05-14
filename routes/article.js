var mongoose = require('mongoose');
var db = require('../model/db.js');
var Article = mongoose.model('Article');

//引入url模块，用来检索get请求的请求体
var url = require('url');

//create Article(创建文章)
exports.createArticle = function (req, res) {
	Article.create({
				title:req.body.title,
				content:req.body.content,
				category:req.body.category,
				introduce:req.body.introduce,
				createtime:req.body.createtime
			}, function (err, article) {
				if (err) {
					console.log(err);
					res.json({title:"something is wrong"});
				}else{
					res.json({title:"success"});
				}
			});
}

exports.getArticles = function (req, res) {
	Article.find( {}, 'title category introduce createtime', function(err,articles){
		if (err) {
			res.json({title:"something wrong"});
		}else{
			console.log(articles);
			res.render('index', {clientArticles:articles});
		}
	});
}

//手机请求不需要渲染页面
exports.phoneGetArticles = function (req, res) {
	Article.find( {}, 'title category introduce createtime', function(err,articles){
		if (err) {
			res.json({title:"something wrong"});
		}else{
			console.log(articles);
			res.json(articles);
		}
	});
}
//通过title获得文章的内容并返回（只返回内容）
exports.findByTitle = function (req, res) {
	//检索get请求并生成相应的字段
	// var title = url.parse(req.url, true).query.title;
	var title = req.url.query.title;//有待验证（牛人指点）
	console.log("title:"+title);
	//设置content筛选 只返回content
	Article.findOne({'title': title}, 'content', function(err,articlecontent){
		if (err) {
			res.json({content:"something wrong"});
		}else{
			console.log("articlecontent:"+articlecontent);
			res.json(articlecontent);
		}
	});
}

//通过title删掉文章
exports.deleteArticle = function (req, res) {
	// var title = url.parse(req.url, true).query.title;
	var title = req.url.query.title;
	console.log("title:"+title);
	// res.json({title: title});
	
	Article.findOneAndRemove({'title': title}, function(err,articletitle){
		if (err) {
			res.json({title:"something wrong"});
		}else{
			console.log("articletitle:"+articletitle);
			res.json( {title: articletitle.title});
		}
	});
}


