var express = require('express');
var router = express.Router();
var mongodb = require('../mongodb/mongodb');
var multer = require('multer');
var fs = require('fs');

var upload = multer({dest: 'images'});

var d = new Date();


router.get('/articlePost', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	mongodb.articleModel.find({}, function(err, docs) {
		if(err) {
			console.log(err);
		}
		res.send(docs);
	});
});

function images () {
		mongodb.articleModel.find({}, function(err, docs) {
			for(var i = 0; i < docs.length; i++) {
				((j) => {
					router.get('/image' + j, function(req, res) {
						res.header("Access-Control-Allow-Origin", "*");
						res.render('image', { image: docs[j].image });
					});
				})(i);
			}
		});
};

images();

router.post('/articlePost', upload.single("image"), function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	if(req.file) {
		articleEntity = mongodb.articleModel({
			articleTitle: req.body.articleTitle,
			articleContent: req.body.articleContent,
			articleAuthor: req.session.name,
			postTime: d.getFullYear() + '年' + d.getMonth() + '月' + d.getDate() + '日' + ' ' + d.getHours() +':' + d.getMinutes(),
			image: 'http://127.0.0.1:3000/' + req.file.path
		});
	}else{
		articleEntity = mongodb.articleModel({
			articleTitle: req.body.articleTitle,
			articleContent: req.body.articleContent,
			articleAuthor: req.session.name,
			postTime: d.getFullYear() + '年' + d.getMonth() + '月' + d.getDate() + '日' + ' ' + d.getHours() +':' + d.getMinutes(),
		});
	}
	
	articleEntity.save(function(err,docs) {
		if(err) {
			console.log(err);
		}
		images();
	});
	res.redirect('http://127.0.0.1:8080');
});

module.exports = router;
