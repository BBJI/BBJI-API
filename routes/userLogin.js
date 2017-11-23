var mongodb = require('../mongodb/mongodb');
var express = require('express');
var router = express.Router();
var sessionName = '';

var juge = false;

router.get('/userData', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.send({'userName':sessionName});
});

router.get('/userLogin', function(req, res) {
	res.render('userLogin', { juge: juge });
	juge = false;
});

router.post('/userLogin', function(req, res) {
	var userEntity = mongodb.userModel({
		name: req.body.name,
		password: req.body.password
	});
	
	mongodb.userModel.find({name: userEntity.name, password: userEntity.password}, function(err, docs) {
		if(err) {
			console.log(err);
		}
		if(docs.length == 0){
			//账号或密码错误的返还结果
			juge = true;
			res.redirect('/userLogin');			
		}else{
			//成功登录之后的操作,跳转至前端页面并存储cookie
			sessionName = req.session.name = docs[0].name;
			res.redirect('http://127.0.0.1:8080');

		}
	});
});

module.exports = router;
