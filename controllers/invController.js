const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}


/*************************************
 * Build inventory management view
 ***********************************/
invCont.buildManagementView = async function(req, res, next) {
    let nav = await utilities.getNav();
    const links = await utilities.getManagementLinks();
    //const classificationSelect = await utilities.buildClassificationList();

    res.render("./inventory/management", {
        title: "Vehicle Management",
        nav,
        links,
        error: null,
        //classificationSelect,
    });
}

/********************************
 * Build add classification view
 ********************************/
//classification view function
invCont.buildAddClassificationView = async function (req, res, next) {
    let nav = await utilities.getNav();
    res.render("./inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: null,
        value:null,
    })
}

//function to add new classificaition
invCont.addClassification = async function (req, res) {
    let nav = await utilities.getNav();
    const {classificationName} = req.body;
    const newClassification = await invModel.addClassification(classificationName);

    if (newClassification) {
        req.flash("notice", `${classificationName} has been added as a new classification.`);
        res.redirect("./");
    } else {
        req.flash("notice", "Classification not added, try again.");
        res.status(501).render("inventory/add-classification",{
            title: "Add New Classification",
            nav,
        });
    }
}


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