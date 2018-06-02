var Mobile = require('../models/mobiles.js')

module.exports.getAddMobile = function(req,res){
    if(req.isAuthenticated()){
        console.log("login success")
        res.send({success:"success"})

    }else{
        console.log("login fail")
        res.send({error:'error'})
    }
}

module.exports.postAddMobile = function(req,res){
    console.log('mobile added')
    var name = req.body.mobileName;
    var model = req.body.mobileModel;
    Mobile.findOne({$and:[{name:name},{model:model}]},function(err,mobile){
        console.log(mobile)
        if(!mobile){
            console.log("add success1")
            var mobile = new Mobile({
                name:req.body.mobileName,
                cost:req.body.mobileCost,
                color:req.body.mobileColor,
                model:req.body.mobileModel,
                battery:req.body.mobileBattery,
                primaryCamera:req.body.mobilePrimaryCamera,
                secondaryCamera:req.body.mobileSecondaryCamera,
                storage:req.body.mobileMemory
            })
            mobile.save(function(err,resultMobile){
                if(err){
                    res.send("mobile not saved")
                }else{
                    var resObj = {
                        success: "Mobile added successfully" //,
                        // mobile: resultMobile
                    }
                    res.send(resObj)
                }
            })
        }else{
            var resObj = {
                error: "mobile already exists"
            }
            res.send(resObj)
        }
    })
}