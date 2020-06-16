var express = require("express");
var router = express.Router(); //a new instance of express router and adding routes to this router. 
var Place = require("../models/place");
var middleware = require("../middleware");


router.get("/", function(req, res) {
    
    Place.find({}, function(err, allplaces){
        if (err) {
            console.log(err);
        } else {
             res.render("places/index", {places:allplaces, currentUser: req.user}); //data + name passing in
        }   
    });
});



router.post("/", middleware.isLoggedIn, function (req, res){
    
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



router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("places/new");
});

router.get("/:id/edit", middleware.checkPlaceOwnership, function(req, res){
    Place.findById(req.params.id, function(err, foundPlace){
        res.render("places/edit", {place: foundPlace});
    });
});

router.put("/:id",middleware.checkPlaceOwnership, function(req, res){
    
    Place.findByIdAndUpdate(req.params.id, req.body.place, function(err, updatedPlace){
       if(err){
           res.redirect("/places");
       } else {
           //redirect somewhere(show page)
           res.redirect("/places/" + req.params.id);
       }
    });
});

router.delete("/:id",middleware.checkPlaceOwnership, function(req, res){
   Place.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/places");
      } else {
          res.redirect("/places");
      }
   });
});




function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router; 