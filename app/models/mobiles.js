var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = mongoose.model('Mobile',new Schema({
    name:String,
    model: String,
    cost : String,
    color : String,
    battery : String,
    primaryCamera : String,
    secondaryCamera : String,
    storage : String
}))