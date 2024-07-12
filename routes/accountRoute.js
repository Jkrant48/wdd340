//needed resources
const express = require("express");
const router = new express.Router();
const accController = require("../controllers/accController");
const utilities = require("../utilities/");

//route for login view
router.get("/login", utilities.handleErrors(accController.buildLoginView));