const express = require("express");
const router = express.Router(); 

router.delete("/review/:id", (req, res) => {
    console.log(req.params.id);

    // Coerce into number
    const id = Number(req.params.id);

    // Defensive check - check that ID is a number
    if (Number.isNaN(id)) {
        res.send({status:0, reason: 'Invalid ID'});
        return;
    }

    const indexOf = req.reviews.findIndex(item => {
        return item.id === id;
    });

    // Defensive check    
    if( indexOf < 0) {
        res.send({ status: 0, reason: "ID not found, may be already deleted"});
    }

    console.log(indexOf);

    req.reviews.splice(indexOf, 1);

    res.send({status: 1});

})

module.exports = router;