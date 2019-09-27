var express = require("express");
// Import the model burger.js to use its db functions
var burger = require("../models/burger.js");
// create the router for the app, and export the router at the end of your file.
var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        // shows me the handlebars object
        console.log(hbsObject);
        // renders it to the index
        res.render("index", hbsObject);
    });
});

// add new burger to the db with post
router.post("/api/burgers", function (req, res) {
    // inserts just one of the name and the yes or no to devoured
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function (result) {
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
    });
});

// sets or puts devoured to true.
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    // updates the devoured condition for one burger
    burger.updateOne({ devoured: req.body.devoured }, condition, function (result) {
        // if there was no change then an error will appear
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// delete a burger from database
router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    burger.deleteOne(condition, function (result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});
// Export routes for server.js to use.
module.exports = router;