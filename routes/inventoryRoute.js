//needed resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")


//route to build inventory by classification view
router.get("/type/:classificaitionId", invController.buildByClassificationId);

module.exports = router;