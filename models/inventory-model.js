const pool = require("../database")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}


/* *********************************
* Get all inventory items and classification_name by classification_id
* ******************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/*********************************
 * Function to get a specific vehicle
 **************************/
async function getInventoryItem(vehicleId) {
  try{
    // Performing a database query to retrieve inventory data for a specific vehicle ID
    const query = `SELECT * FROM public.inventory WHERE inv_id = $1`;
    const data = await pool.query(query, [vehicleId]);
    // Returning the resulting rows from the query
    return data.rows;
  } catch (error) {
    // Error handling: logging the error to the console
    console.error("getInventory error " + error);
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryItem};