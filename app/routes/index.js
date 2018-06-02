var express = require('express');

var router = express.Router();

var indexController = require("../controllers/index-controller.js");
var addMobileController = require("../controllers/addMobile-controller.js")
var allMobileController = require('../controllers/allmobiles-controller')
var viewMobileController = require('../controllers/viewMobile-controller.js')
var editMobileController = require("../controllers/editMobile-controller");
var registerController = require('../controllers/register-controller')

router
     .route('/')
     .get(indexController.getIndex);
// router
//      .route('/register')
//      .post(registerController.postRegister);
// router
//      .route('/login')
//      .post(registerController.postLogin)
router
    .route('/login')
    .get(registerController.getLogin)
router
     .route('/addmobile')
     .get(addMobileController.getAddMobile)
     .post(addMobileController.postAddMobile)
router
     .route("/mobiles")
     .get(allMobileController.getAllMobiles)
router
     .route('/mobiles/:id')
     .get(viewMobileController.getReqMobile)
router
     .route('/editmobile/:id')
     .post(editMobileController.postEditMobile)
router
     .route('/deletemobile/:id')
     .get(editMobileController.getDeleteMobile)

module.exports = router;