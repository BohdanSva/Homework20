const express = require("express");
const app = express(); 
const reviews = require("./data/reviews.json");

app.use((req, res, next) => {
    console.log("New request!");
    next();
})

app.use((req, res, next) => { // Make the data set available to associated modules
    req.reviews = reviews; 
    next();
});

app.use(express.json()); // Convert body to json

// Routes
app.use("/add", require("./routes/add")); // Create
// http://localhost:6001/add/review/[item id] - add item with POST body in the format {"id": number, "rating": number, "text": "string"}
app.use("/get", require("./routes/get")); // Read
// http://localhost:6001/get/reviews - get all items
// http://localhost:6001/get/review/[item id] - get one item
app.use("/update", require("./routes/update")); // Update
// http://localhost:6001/update/review/[item id] - update item with PATCH tbody in the format {"rating": number, "text": "string"}
app.use("/delete", require("./routes/delete")); // Delete
// http://localhost:6001/delete/review/[item id] - delete item with DELETE request

const port = process.env.PORT || 6001;
app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
}) 