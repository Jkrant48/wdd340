const invModel = require("../models/inventory-model")
const utilities = require(".")
    const {body, validationResult} = require("express-validator")
    const validate = {}



/**************************
 * classification Data validation Rules
 **************************/

validate.classificationRules = () => {
    return[
        body("classificationName")
            .trim()
            .escape()
            .notEmpty()
            .matches("^[a-zA-Z]*$")
            .isLength({min: 3})
            .withMessage("Please enter a classification name. Mininum length is 3 characters.")
            .custom(async (classification_name) => {
                const classificationExists = await invModel.checkExistingClassification(classification_name)
                if (classificationExists) {
                    throw new Error("Classification already exists.")
                }
            }),
    ]
}


validate.checkClassificationData = async (req, res, next) => { // Function to check classification data and return errors if any
    const { classificationName } = req.body
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", { 
            errors,
            title: "Add New Classification",
            nav,
            value: classificationName,
        })
        return
    }
    next() 
}

module.exports = validate