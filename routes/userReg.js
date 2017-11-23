var mongodb = require('../mongodb/mongodb');
var express = require('express');
var router = express.Router();
var isPasswordSame = false;
var isNameExist = false;


/* GET users listing. */
router.get('/userReg', function(req, res, next) {
  res.render('userReg', { isPasswordSame: isPasswordSame, isNameExist: isNameExist });
  isPasswordSame = false;
  isNameExist = false;
});

router.post('/userReg',function(req, res) {
	
	var userEntity = mongodb.userModel({
		name: req.body.name,
		password: req.body.password,
		repassword: req.body.repassword,
		email: req.body.email
	});
	
	if(userEntity.password !== userEntity.repassword){
		isPasswordSame = true;
		res.redirect('/userReg');
	}else{
		mongodb.userModel.find({name: userEntity.name}, function(err, docs) {
			if(err) {
				console.log(err);
			}
			if(docs.length == 0) {
				userEntity.save(function(err, docs) {
				if(err) {
				console.log(err);
				}	
				router.get('/success', function(req, res) {
					//回到前端页面
				res.send('注册成功！' + '<a href="http://127.0.0.1:8080">回到首页</a>');
				});
				res.redirect('/success')
				});
			}else{
				isNameExist = true;
				res.redirect('/userReg');
			}
		});
	}
});

module.exports = router;
