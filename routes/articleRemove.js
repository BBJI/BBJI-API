var express = require('express');
var router = express.Router();
var mongodb = require('../mongodb/mongodb');

router.get('/articleRemove', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	mongodb.articleModel.remove({_id: req.query.articleId}, function(err, docs) {
		if(err) {
			console.log(err);
		}
	});
});

module.exports = router;
