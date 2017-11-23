var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = mongoose.createConnection("mongodb://localhost/data");
var Schema = mongoose.Schema;
var userSchema = new Schema({
	name: {type: String},
	password: {type: String},
	repassword: {type: String},
	email: {type: String}
});
var articleSchema = new Schema({
	articleTitle: {type: String},
	articleContent: {type: String},
	articleAuthor: {type: String},
	postTime: {type:String},
	image: {type: String}
});
	
var userModel = db.model('userModel', userSchema);
var articleModel = db.model('articleModel', articleSchema);


module.exports = {
	userModel: userModel,
	articleModel: articleModel
}

