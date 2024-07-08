const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***********************************
* Build inventory by classification view
* *********************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificaitionId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    //console.log(data)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/******************************
 * get inventory detail for a vehicle
 *******************************/

invCont.buildInventoryItemDetail = async (req, res, next) => {
    const vehicleId = req.params.singleViewId;
    const data = await invModel.getInventoryItem(vehicleId);
    console.log(data);
    const singleView = await utilities.buildInventoryItemDetail(data);
    
    let nav = await utilities.getNav()
    const className = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`;
    res.render('inventory/singleView', {
        title: className,
        nav,
        singleView,
        inv_id: vehicleId
    })
}

invCont.serverError = async (req, res, next) => {
    const error = new Error("Geat!");
    next(error);
}

module.exports = invCont