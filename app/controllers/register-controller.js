var User = require('../models/users.js')

module.exports.getRegister = function (req, res) {
    res.send({ succcess: "success" })
}

module.exports.getLogin = function (req, res) {
    res.send({ succcess: "success" })
}

module.exports.postRegister = function (req, res) {
    var email = req.body.registerEmail;
    var passowrd = req.body.registerPassword;
    User.findOne({ email: email }, function (err, user) {
        if (!user) {
            var user = new User({
                email: email,
                password: passowrd
            })
            user.save(function (err, doc) {
                if (err) {
                    res.send({ error: "user not registerd" })
                }
                if (doc) {
                    res.send({ success: "registered successfully" })
                }
            })
        }

    })
}

module.exports.postLogin = function (req, res) {
    var email = req.body.loginEmail;
    var password = req.body.loginPassword;
    User.findOne({ email: email }, function (err, user) {
        if (user) {
            if (user.password == password) {
                console.log('user and passowrd exist')
                res.send({ success: "success" })
            } else {
                console.log('password not exist')
                res.send({ error: "incorrect password" })
            }
        }else{
            console.log('user not exist')
            res.send({error:"user not exist"})
        }
    })
}