var express    = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//     name: "Mystic Pointe",
//     image:  "https://cdn.pixabay.com/photo/2017/07/17/16/21/turkey-2512944_960_720.jpg",
//     description: "Small secluded campground in the mountains. No bathrooms. No water. Beautiful scenery"
//     },
//     function(err, campground){
//         if(err){
//             console.log(err)
//         } else {
//         console.log("NEWLY CREATED CAMPGROUND")
//         console.log(campground);
//     }
    
    
// });
       
       app.get("/", function(req, res){
    res.render("landing");
});


//INDEX
app.get("/campgrounds", function(req,  res){
          //get all campgrounds from db
          Campground.find({}, function(err, allCampgrounds){
              if(err){
                  console.log(err);
              } else {
                     res.render("index",{campgrounds:allCampgrounds});
              }
          })
});


//CREATE
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
  //create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err)
      } else {
           //redirct back to campgrounds page 
    res.redirect("/campgrounds");
      }
  });
});


//NEW - show form to create new route
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")
});



//SHOW- shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        } else{
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
    req.params.id
    //render show template with that campground
    
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started")
});
