//needed resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validator = require("../utilities/management-validation");


//route to management view
router.get("/", invController.buildManagementView);

//post to add classifiation
router.post("/addclassification", validator.classificationRules(), validator.checkClassificationData, 
utilities.handleErrors(invController.addClassification));

//route to add a classification
router.get("/add-classification", invController.buildAddClassificationView);

//route to build inventory by classification view
router.get("/type/:classificaitionId", utilities.handleErrors(invController.buildByClassificationId));

//route to build single view
router.get("/detail/:singleViewId", utilities.handleErrors(invController.buildInventoryItemDetail));

//intentional error route
router.get("/serverError", utilities.handleErrors(invController.serverError));

module.exports = router;