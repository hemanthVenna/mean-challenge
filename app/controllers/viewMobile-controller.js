var Mobile = require("../models/mobiles.js")
module.exports.getReqMobile = function (req, res) {
    Mobile.findById(req.params.id).exec(function (err, mobile) {
        res.send({ viewmobile: mobile })
    })
}