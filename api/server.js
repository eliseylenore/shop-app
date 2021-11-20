// BASE SETUP
// =============================================================================

// call the packages we need
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express"); // call express
const app = express(); // define our app using express
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/users/");
const products = require("./routes/products/");
const mongoose = require("mongoose");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Handle production
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(__dirname + "/public"));

  // Handle single page application
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 3000; // set our port

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Mongo db connected"))
  .catch(err => console.log(err));

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use((req, res, next) => {
  // do logging
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get("/", (req, res) => {
  res.json({ message: "Yippee! welcome to our api!" });
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./passport")(passport);

// Routes
// -----------------------------------
app.use("/api/users", users);
app.use("/api/products", products);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens here: http://localhost:" + port + "/api");
