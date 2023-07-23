const express = require("express");
const router = express.Router(); 

router.patch("/review/:id", (req, res) => {
    console.log(req.body, req.params.id);

    // Coerce into number
    const id = Number(req.params.id);

    // Defensive check - check that ID is a number
    if (Number.isNaN(id)) {
        res.send({status:0, reason: 'Invalid ID'});
        return;
    }

    const { rating, text } = req.body; // destructure from req.body

    // First find where the item is in the array
    const indexOf = req.reviews.findIndex(item => {
        return item.id === id;
    })

    // Check that ID exists
    if (indexOf === -1) { 
        res.send({ status: 0, reason: "ID not found"});
        return; 
    }

    if (rating && typeof rating === "number") {
        req.reviews[indexOf].rating = rating;
    } else {
        res.send({ status: 0, reason: "Invalid rating value"});
        return;}
    if (text && typeof text === "string") {
        req.reviews[indexOf].text = text;
    } else {
        res.send({ status: 0, reason: "Invalid text value"});
        return;}

    res.send({ status: 1});

    console.log(indexOf);

}); 

module.exports = router;
