var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    email:String,
    password:String
})

userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password,hash){
    return bcrypt.compareSync(password,hash)
}

module.exports = mongoose.model('User',userSchema)