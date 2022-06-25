const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    favoriteGenre:{
        type:String,
        required:true,
    }
});

var userModel = mongoose.model('user', UserSchema);
module.exports = mongoose.model("User", UserSchema);