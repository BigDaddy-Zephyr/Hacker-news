var mongoose=require("mongoose");
var passportLocalMongoose=require('passport-local-mongoose');


var Schema=mongoose.Schema;

var UserSchema=new Schema({

	username:{type:String,
			  unique: true},
	name:String,
	password:String,
})


UserSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model('User',UserSchema);
