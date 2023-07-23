const express = require("express");
const router = express.Router();
const asyncMySQL = require("../sql/connection");

// Create
router.post("/", async (req, res) => {
    const { name, address } = req.body;
    try {
      const result = await asyncMySQL(`INSERT INTO hotels 
                                        (id, name, address) 
                                            VALUES (NULL, '${name}', '${address}');`);
                                                
      // Send back status 1 and the ID under which the new hotel was inserted into the SQL database
      res.send({ status: 1, hotelId: result.insertId }); 
    } catch (error) {
      res.send({ status: 0 });
    }
});

// Read
// router.get("/:id", async (req, res) => {
//     const id = Number(req.params.id);
  
//     // Defensive check
//     if (Number.isNaN(id)) {
//       res.send({ status: 0, reason: "Invalid ID" });
//       return;
//     }

//     // GET request sending SQL command and getting results back
//     const results = await asyncMySQL(`SELECT id, name, address
//                                         FROM hotels
//                                           WHERE id LIKE ${id};`);
//     if (results.length > 0) {
//       res.send({ status: 1, results });
//       return;
//     }
//     res.send({ status: 0, reason: "ID not found" });
// });

// Read jointly with reviews for the hotel
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
  
    // Defensive check
    if (Number.isNaN(id)) {
      res.send({ status: 0, reason: "Invalid ID" });
      return;
    }
    const results = await asyncMySQL(`
    SELECT * FROM hotels
	    LEFT JOIN hotel_reviews
    	    ON hotels.id = hotel_reviews.hotel_id
                WHERE hotels.id LIKE ${id};`);
    if (results.length > 0) {
      res.send({ status: 1, results });
      return;
    }
    res.send({ status: 0, reason: "ID not found" });
});

// Update
router.patch("/:id", async (req, res) => { 
    const id = Number(req.params.id);
  
    // Defensive check
    if (Number.isNaN(id)) {
      res.send({ status: 0, reason: "Invalid ID" });
      return;
    }
  
    // PATCH request sending SQL command to change the data associated with the endpoint ID
    const { name, address } = req.body;
    try {
      //for security we have repitition
      if (name && typeof name === "string") {
        await asyncMySQL(`UPDATE hotels SET name = "${name}"
                          WHERE id LIKE "${id}";`);
      }
      if (address && typeof address === "string") {
        await asyncMySQL(`UPDATE hotels SET address = "${address}"
                          WHERE id LIKE "${id}";`);
      }
    } catch (error) {
      res.send({ status: 0, reason: error.sqlMessage });
    }
    res.send({ status: 1 });
  });

// Delete
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
  
    // Defensive check
    if (Number.isNaN(id)) {
      res.send({ status: 0, reason: "Invalid ID" });
      return;
    }
  
    await asyncMySQL(`DELETE FROM hotels
                        WHERE id LIKE ${id};`);
  
    res.send({ status: 1 });
});

module.exports = router;
