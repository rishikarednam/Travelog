var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    passport    = require("passport"),
    LocalStrategy   = require("passport-local"),
    mongoose    = require("mongoose");
    Place  = require("./models/place"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");


var placeRoutes = require("./routes/places"),
    indexRoutes      = require("./routes/index");    

mongoose.connect("mongodb://localhost/travelog", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret: "secret page",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //passport authenticate middleware
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next(); //to move to next middleware
});

app.use("/", indexRoutes);
app.use("/places", placeRoutes); 






app.listen(3000, function(){
    console.log("Server has started!");
});