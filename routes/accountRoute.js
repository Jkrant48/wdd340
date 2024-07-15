//needed resources
const express = require("express");
const router = new express.Router();
const accController = require("../controllers/accController");
const utilities = require("../utilities/");

//route for login view
router.get("/login", utilities.handleErrors(accController.buildLoginView));

//registeration route
router.get("/register", utilities.handleErrors(accController.buildRegisterView));

//register account route
router.post("/register", utilities.handleErrors(accController.registerAccount));

module.exports = router;