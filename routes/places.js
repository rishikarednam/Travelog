var express = require("express");
var router = express.Router(); 
var Place = require("../models/place");

router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Place.find({}, function(err, allplaces){
        if (err) {
            console.log(err);
        } else {
             res.render("places/index", {places:allplaces, currentUser: req.user}); 
        }   
    });
});



router.post("/", function (req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var visited = req.body.visited;
    var bucket_list = req.body.bucket_list;
    var date = req.body.date;
    var newPlace = {name: name, image: image, description: description, visited: visited, bucket_list: bucket_list,date: date };
   
   Place.create(newPlace, function(err, newlyCreated){
      if (err) {
          console.log(err);
      } else {
           
          res.redirect("/places"); //
      }
   });
});



router.get("/new", function(req, res){
   res.render("places/new");
});







function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router; 
