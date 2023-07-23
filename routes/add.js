const express = require("express");
const router = express.Router(); 

router.post("/review", (req, res) => {

    const { id, rating, text } = req.body; // destructure from req.body

    // Defensive check
    if (!id || 
        !rating || 
        !text || 
        typeof id !== "number" ||
        typeof rating !== "number" ||
        typeof text !== "string"
        ) {
        res.send( {status: 0, reason: 'Incomplete or invalid request'} );
    }

    req.reviews.push(
        {
            id,
            rating,
            text
        }
    )

    res.send({status: 1});
    console.log(req.body);
})

module.exports = router;