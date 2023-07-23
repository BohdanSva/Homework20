const express = require("express");
const router = express.Router();
const asyncMySQL = require("../sql/connection");
const addReview = require("../sql/queries");

// Create
router.post("/", async (req, res) => {
    const { rating, text } = req.body;
    try {
      const result = await asyncMySQL(addReview(rating, text));
      // Send back status 1 and the ID under which the new review was inserted into the SQL database
      res.send({ status: 1, reviewId: result.insertId }); 
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
    const results = await asyncMySQL(`SELECT id, rating, text
                                        FROM reviews
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
    const { rating, text } = req.body;
    try {
      //for security we have repitition
      if (rating && typeof rating === "number") {
        await asyncMySQL(`UPDATE reviews SET rating = "${rating}"
                          WHERE id LIKE "${id}";`);
      }
      if (text && typeof text === "string") {
        await asyncMySQL(`UPDATE reviews SET text = "${text}"
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
  
    await asyncMySQL(`DELETE FROM reviews
                        WHERE id LIKE ${id};`);
  
    res.send({ status: 1 });
});

module.exports = router;
