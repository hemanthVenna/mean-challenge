var express = require('express');
var router = express.Router();
var User = require('../models/users')

module.exports = function (passport) {
    router.post('/register', function (req, res) {
        var email = req.body.registerEmail;
        var password = req.body.registerPassword;
        User.findOne({ email: email }, function (err, user) {
            if (!user) {
                var user = new User()
                user.email = email;
                user.password = user.hashPassword(password)
                user.save(function (err, doc) {
                    if (err) {
                        res.send({ error: "user not registerd" })
                    }
                    if (doc) {
                        res.send({ success: "registered successfully" })
                    }
                })
            }else{
                res.send({error:"User already exists"})
            }

        })

    });
    router.post('/login',passport.authenticate('local',{
        failureRedirect:'/login',
        successRedirect:'/addmobile',
    }),function(req,res){
        console.log("login success")
        console.log(req.body)
        res.send({success:"success"})
    })
    return router;
}