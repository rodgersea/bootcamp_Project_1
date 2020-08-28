// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");


// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 8080;

// var compression = require('compression')
// app.use(compression())

// Requiring our models for syncing
var db = require("./models");
// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
//IMPORTANT TO REMOVE BEFORE PROD - force = true rebuilds all db objects (deleting all data)
//db.sequelize.sync({ force: true }).then(function() {
db.sequelize.sync().then(function() {  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});