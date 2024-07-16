//needed resources
const express = require("express");
const router = new express.Router();
const accController = require("../controllers/accController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/account-validation");

//route for login view
router.get("/login", utilities.handleErrors(accController.buildLoginView));

//registeration route
router.get("/register", utilities.handleErrors(accController.buildRegisterView));

//register account route
// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accController.registerAccount)
  )
  
module.exports = router;