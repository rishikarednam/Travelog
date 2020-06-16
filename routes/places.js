var express = require("express");
var router = express.Router(); //a new instance of express router and adding routes to this router. 
var Place = require("../models/place");

router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Place.find({}, function(err, allplaces){
        if (err) {
            console.log(err);
        } else {
             res.render("places/index", {places:allplaces, currentUser: req.user}); //data + name passing in
        }   
    });
});


//CREATE - add new campgrounds to database
router.post("/", function (req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var visited = req.body.visited;
    var bucket_list = req.body.bucket_list;
    var date = req.body.date;
    var newPlace = {name: name, image: image, description: description, visited: visited, bucket_list: bucket_list,date: date };
   //create a new campground and save to db
   Place.create(newPlace, function(err, newlyCreated){
      if (err) {
          console.log(err);
      } else {
           // redirect back to campgrounds page
          res.redirect("/places"); //
      }
   });
});


//NEW - show form to create new campground 
router.get("/new", function(req, res){
   res.render("places/new");
});


//SHOW - shows more info about campground selected - to be declared after NEW to not overwrite



//middleware to check about logged in or not
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router; //returning/exporting r