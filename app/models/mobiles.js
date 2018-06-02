var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = mongoose.model('Mobile',new Schema({
    name:String,
    model: String,
    cost : Number,
    color : String,
    battery : Number,
    primaryCamera : Number,
    secondaryCamera : Number,
    storage : Number
}))