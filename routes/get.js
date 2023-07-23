const express = require("express");
const router = express.Router(); 

// Get all data
router.get("/reviews", (req, res) => {
    console.log("Route ran");
    res.send( {status: 1, reviews: req.reviews} );
})

// Get individual piece of data by ID
router.get("/review/:id", (req, res) => {

    // Coercion into number
    const id = Number(req.params.id);

    // Defensive check - check that ID is a number
    if (Number.isNaN(id)) {
        res.send({status:0, reason: 'Invalid ID'});
        return;
    }

    // Copy and find the specific character
    const _reviews = [...req.reviews]; // Create a local copy
    const review = _reviews.find(item => { // Find the item in the data
        return item.id === id;
    });

    // Defensive check - handle the scanario of selecting route to more than there is characters
    if(!review) {
        res.send({ status: 0, reason: "ID not found"});
    }

    res.send({ status: 1, review }); // Return that indiviudal single item
});

module.exports = router;