var Mobile = require('../models/mobiles.js')

module.exports.getAllMobiles = function(req,res){
    Mobile.find({},function(err,mobiles){
        if(mobiles.length > 0){
            res.send({mobiles:mobiles})

        }else{
            res.send({message:"Mobiles not existed"})
        }
    })
}