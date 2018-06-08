var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");




   var campgrounds =  [
       {name: "Mystic Pointe", image: "https://cdn.pixabay.com/photo/2017/07/17/16/21/turkey-2512944_960_720.jpg"},
       {name: "Holmes Landing", image: "https://cdn.pixabay.com/photo/2016/12/08/17/45/lake-sara-1892494_960_720.jpg"},
       {name: "Enchanted Dunes", image: "https://cdn.pixabay.com/photo/2016/11/15/23/43/motorhome-1827832_960_720.jpg"},
       {name: "Mystic Pointe", image: "https://cdn.pixabay.com/photo/2017/07/17/16/21/turkey-2512944_960_720.jpg"},
       {name: "Holmes Landing", image: "https://cdn.pixabay.com/photo/2016/12/08/17/45/lake-sara-1892494_960_720.jpg"},
       {name: "Enchanted Dunes", image: "https://cdn.pixabay.com/photo/2016/11/15/23/43/motorhome-1827832_960_720.jpg"},
       {name: "Mystic Pointe", image: "https://cdn.pixabay.com/photo/2017/07/17/16/21/turkey-2512944_960_720.jpg"},
       {name: "Holmes Landing", image: "https://cdn.pixabay.com/photo/2016/12/08/17/45/lake-sara-1892494_960_720.jpg"},
       {name: "Enchanted Dunes", image: "https://cdn.pixabay.com/photo/2016/11/15/23/43/motorhome-1827832_960_720.jpg"}
       
       ];
       
       app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req,  res){

       res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirct back to campgrounds page 
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started")
});