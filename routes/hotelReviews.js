const express = require("express");
const router = express.Router();
const asyncMySQL = require("../sql/connection");

// Create
router.post("/", async (req, res) => {
    const { hotel_id, rating, text } = req.body;
    try {
      const result = await asyncMySQL(`INSERT INTO hotel_reviews
                                        (hotel_id, rating, text)
                                            VALUES
                                                ("${hotel_id}", "${rating}", "${text}");`);
      // Send back status 1 and the ID under which the new hotel review was inserted into the SQL database
      res.send({ status: 1, hotelReviewId: result.insertId }); 
    } catch (error) {
      res.send({ status: 0 });
    }
});

// Read
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
  
    // Defensive check
    if (Number.isNaN(id)) {
      res.send({ status: 0, reason: "Invalid ID" });
      return;
    }

    // GET request sending SQL command and getting results back
    const results = await asyncMySQL(`SELECT id, hotel_id, rating, text
                                        FROM hotel_reviews
                                          WHERE id LIKE ${id};`);
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
    const { hotel_id, rating, text } = req.body;
    try {
      //for security we have repitition
      if (hotel_id && typeof hotel_id === "number") {
        await asyncMySQL(`UPDATE hotel_reviews SET hotel_id = "${hotel_id}"
                          WHERE id LIKE "${id}";`);
      }
      if (rating && typeof rating === "number") {
        await asyncMySQL(`UPDATE hotel_reviews SET rating = "${rating}"
                          WHERE id LIKE "${id}";`);
      }
      if (text && typeof text === "string") {
        await asyncMySQL(`UPDATE hotel_reviews SET text = "${text}"
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
  
    await asyncMySQL(`DELETE FROM hotel_reviews
                        WHERE id LIKE ${id};`);
  
    res.send({ status: 1 });
});

module.exports = router;
