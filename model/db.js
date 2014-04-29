var mongoose = require('mongoose');
// var	dbURL = 'mongodb://localhost:27017/articleDB';//localhost本地数据库， articleDB是将要存储文章的数据库（collection）
var	dbURL = 'mongodb://D_ttang:123456789@oceanic.mongohq.com:10030/tt-blog'
// Create the dateabase connection(连接数据库)
mongoose.connect(dbURL);

//Define connection events（建立连接时的事件监听连接状态）
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURL);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

var Schema = mongoose.Schema;

/*******************************
创建admin身份验证
**********************************/
var adminSchema = new Schema({
	username:{type:String, required:true, unique: true},
	password:{type:String, required:true}
}, {strict: true});

mongoose.model('userAdmin' , adminSchema);

/*********************************
 create article schema(创建文章结构)
******************************/
var discussesSchema = new Schema({
	addr:{type:String, required:true},
	content:{type:String, required:true}
});

var articleSchema = new Schema({
	title:{type:String, unique:true, required:true },
	content:{type:String, required:true},
	category:{type:String, required:true},
	introduce:{type:String, required:true},
	createtime:{type:String, required:true},
	discusses: [discussesSchema]
},{strict: true});

//====验证========

//Build the Article model(创建文章模型)
mongoose.model( 'Article', articleSchema );

// exports.createArticle = function (req, res) {
// 	Article.create({
// 				title:req.body.title,
// 				content:req.body.content,
// 				category:req.body.category,
// 				createtime:req.body.createtime
// 			}, function (err, article) {
// 				if (err) {
// 					res.json({title:"something is wrong"});
// 				}else{
// 					res.json({titles:"success"});
// 				}
// 			});
// }