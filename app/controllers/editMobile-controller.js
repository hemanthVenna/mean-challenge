var Mobile = require("../models/mobiles.js")

module.exports.postEditMobile = function(req,res){
    Mobile.findById(req.params.id).exec(function(err,mobile){
        var data = {
            name:req.body.mobileName,
            cost:req.body.mobileCost,
            color:req.body.mobileColor,
            model:req.body.mobileModel,
            battery:req.body.mobileBattery,
            primaryCamera:req.body.mobilePrimaryCamera,
            secondaryCamera:req.body.mobileSecondaryCamera,
            storage:req.body.mobileMemory
        }
        Mobile.update({_id : req.params.id}, {$set : data},{ upsert: false, multi: false },function(err,data){
            if(data){
                console.log("success")
                res.send({success:data})
            }
        })

    })
}

module.exports.getDeleteMobile = function(req,res){
    Mobile.findById(req.params.id).exec(function(err, mobile){
      mobile.remove(function(err,removedDoc){
          res.send("deleted successfully")
      })
    })
}