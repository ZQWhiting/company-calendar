//var db = require("../models");
var path = require("path");
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    //console.log("huh?");
    res.sendFile(path.join(__dirname, "../views/layouts/login.html"));
  });

  app.get("/calendar", function(req, res) {
    console.log("yay");
    res.sendFile(path.join(__dirname, "../views/layouts/main.html"));
  });

  app.get("/register", function(req, res) {
    //console.log("yay");
    res.sendFile(path.join(__dirname, "../views/layouts/register.html"));
  });

  // Load example page and pass in an example by id
  /*app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });*/

  // Render 404 page for any unmatched routes
  /*app.get("*", function(req, res) {
    res.render("404");
  });*/
};