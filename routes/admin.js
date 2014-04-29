var mongoose = require('mongoose');
// var db = require('../model/db.js');
//引入iniparser模块
var iniparser = require('iniparser');
//加载检索配置文件
//====================???被app require加载后文件的根目录都是app所在的目录？？？
var adminconfig = iniparser.parseSync('./config/adminconfig.ini');
// =====================

// 配置文件验证；
exports.inicheck = function (req, res) {
	console.log("adminconfig.adminname:" + adminconfig.adminname);
	console.log("adminconfig.adminpassword:" + adminconfig.adminpassword);
	console.log("req.body.username: "+req.body.username);
	console.log("req.body.password: "+req.body.password);
	if (adminconfig.adminname == req.body.username) {
		if (adminconfig.adminpassword == req.body.password) {
			res.json({title:"ok"});
		} else{
			res.json({title:"密码不正确"});
		}
	} else{
		res.json({title:'admin 不存在'});
	}
	// if (adminconfig.admin) {} else{};
}

//数据库验证
var userAdmin = mongoose.model('userAdmin');

exports.check = function (req, res) {
	console.log("req.body.username:" + req.body.username);
	console.log("req.body.password:" + req.body.password);
	userAdmin.findOne({username:req.body.username, password:req.body.password}
				,'username', function (err, admin) {
					console.log("admin:"+admin);
					if (err) {
						res.json({title:'something is wrong'});
					}else{
						if (admin) {
							res.json({title:'ok'});
						} else{
							res.json({title:'noneAdminExist'});
						}		
					}
				});
	// res.json({title:'ok'});
}

exports.createUser = function (req, res) {
	userAdmin.create({
				username:req.body.username,
				password:req.body.password
			}, function (err, article) {
				if (err) {
					console.log(err);
					res.json({title:"something is wrong"});
				}else{
					res.json({title:"success"});
				}
			});
}