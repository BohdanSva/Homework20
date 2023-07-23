const express = require("express");
const app = express(); 

const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
    console.log("New request!");
    next();
})

app.use(express.json()); // Convert body to json

// Routes
app.use("/reviews", require("./routes/reviews"));
app.use("/hotels", require("./routes/hotels"));
app.use("/hotelReviews", require("./routes/hotelReviews"));

const port = process.env.PORT || 6001;
app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
}) 