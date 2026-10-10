const Home = require("../models/home");
const fs = require('fs');

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", { title: "AddHome", editing: false , isLoggedIn : req.session.isLoggedIn, user: req.session.user,});
};

exports.postAddHome = async(req, res, next) => {
  const { housename, rating, price, location,description } =
    req.body;
    console.log("There are form-data :", housename, rating, price, location, description);
    console.log("There are file-data :", req.file);
    const photoUrl = await req.file.path;
  const home = new Home({
    housename,
    rating,
    price,
    location,
    photoUrl,
    description,
  });
  home.save();

  res.render("host/homeAdded", { title: "Successfull Added" , isLoggedIn : req.session.isLoggedIn, user: req.session.user,});
};

exports.getEditHome = (req, res, next) => {
  const homeid = req.params.homeid;
  const editing = req.query.editing === "true";

  Home.findById(homeid).then((home) => {
    if (!home) {
      console.log("Home not found for editing");
      res.redirect("/host/host-home-list");
    } else {
      console.log(editing, home);
      res.render("host/edit-home", {
        title: "AddHome",
        editing: editing,
        home: home, 
        isLoggedIn : req.session.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, housename, rating, price, location, description } =
    req.body;
  
  Home.findById(id).then((home) =>{
    home.housename = housename;
    home.rating = rating;
    home.price = price;
    home.location = location;
    if(req.file){
      fs.unlink(home.photoUrl, (err) => {
        if (err) {
          console.log("Error while deleting old photo", err);
        } else {
          console.log("Old photo deleted successfully");
        }
      });
      home.photoUrl = req.file.path;
    };
    home.description = description;
    home.save().then(result => {
      console.log("Home Updated ✅",result);
    }).catch(err => {
      console.log("Home Update failed ❌",err);
    });
    res.redirect("/host/host-home-list");
  }).catch(err => {
      console.log("Home fetch failed ❌",err);
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeid = req.body.homeid;

  Home.findByIdAndDelete(homeid)
    .then((result) => {
      console.log(result);
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while deleting", err);
    });
};

exports.hosthomelist = (req, res, next) => {
  Home.find().then((registeredHome) => {
    res.render("host/host-home-list", {
      registeredHome: registeredHome,
      title: "Favourite", 
      isLoggedIn : req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};
