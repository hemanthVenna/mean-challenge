var localStrategy = require('passport-local').Strategy;
var User = require('../models/users.js');

module.exports = function (passport) {
    console.log("hai passport")
    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (user, done) {
        done(null, user)
    })

    passport.use(new localStrategy(function(username, password, done) {
        console.log(username, password)
        console.log("hai")
        User.findOne({ email: username }, function (err, doc) {
            if (err) {
                done(err)
            } else {
                if (doc) {
                    var valid = doc.comparePassword(password, doc.password)
                    if (valid) {
                        done(null, {
                            email: doc.email,
                            password: doc.password
                        })
                        // res.send({success:"success"})
                    }
                    else {
                        done(null, false)
                    }

                } else {
                    done(null, false)
                }
            }
        })
    }))
}