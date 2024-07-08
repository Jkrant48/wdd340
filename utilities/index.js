const invModel = require("../models/inventory-model")
const Util = {}

/* ******************
 Constructs the nav HTML unordered list
********************* */ 
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    //console.log(data)
    let list = "<ul>"
    list += '<li><a href="/" title="Home page">Home</a></li>'
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name + 
            'vehicles">' +
            row.classification_name + 
            "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

  /**********************************************
   * function to build single view of inventory
   **********************************************/
  Util.buildInventoryItemDetail = async (data) => {
    let singleView;
    singleView = "<div id='singleView'>";
    data.forEach(vehicle => {
    singleView += "<div id='singleViewImage'>";
    singleView += '<img src="' + vehicle.inv_thumbnail + '" alt="Image of' + vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Motors"/>';
    singleView += "</div>";
    // Add the vehicle details section
    singleView += "<div id='singleViewInfo'>";
    singleView += "<h3>" + vehicle.inv_make + ' ' + vehicle.inv_model + " Details </h3>";
    singleView += "<p><strong>Price:</strong> " + ' $' + Intl.NumberFormat('en-US').format(vehicle.inv_price) + "</p>";
    singleView += "<p><strong>Description:</strong> " + ' ' + vehicle.inv_description + "</p>";
    singleView += "<p><strong>Color:</strong> " + ' ' + vehicle.inv_color + "</p>";
    singleView += "<p><strong>Miles:</strong> " + ' ' + Intl.NumberFormat('en-US').format(vehicle.inv_miles) + "</p>";
    singleView += "</div>";
    });
    // Close the single view container
    singleView += "</div>";
    // Return the built single view HTML
    return singleView;
  }
  
/******************************************** 
 * Middleware for handling errors
 * Wrap other function in this for
 * General error handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util