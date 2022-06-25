const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var MovieSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    release:{
        type:Number,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    }
});

var movieModel = mongoose.model('movie', MovieSchema);
module.exports = mongoose.model("Movie", MovieSchema);