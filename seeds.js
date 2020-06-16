var mongoose    = require("mongoose");
var Place  = require("./models/place");



var data =[
    
]



function seedDB() {
         
    Place.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("Removed places.");
              
            data.forEach(function(seed){
                Place.create(seed, function(err, place){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added a place..");
                        
                     }  
                 
                });
            });
    });
       
}

module.exports = seedDB;