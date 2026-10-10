const Home = require("../models/home");
const User = require("../models/user");

exports.index = (req, res, next) => {
  Home.find().then((registeredHome) => {
    res.render("store/index", {
      registeredHome: registeredHome,
      title: "Home",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};
exports.homeList = (req, res, next) => {
  Home.find().then((registeredHome) => {
    res.render("store/home-list", {
      registeredHome: registeredHome,
      title: "Home List",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  });
};
exports.bookings = (req, res, next) => {
  res.render("store/bookings", {
    title: "My Bookings",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.homeDetailPage = (req, res, next) => {
  let homeid = req.params.homeid;
  Home.findById(homeid).then((home) => {
    if (!home) res.redirect("/");
    else {
      res.render("store/home-details", {
        title: "My Bookings",
        home,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};

exports.getFavourites = async (req, res, next) => {
  const userid = req.session.user._id;
  const user = await User.findById(userid).populate("favourites");

  res.render("store/favourite-list", {
    title: "Favourites",
    favouritesWithDetails: user.favourites,
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
  });
};

exports.postFavourites = async (req, res, next) => {
  const homeid = req.body.homeid;
  const userid = req.session.user._id;
  const user = await User.findById(userid);
  if(user.favourites.includes(homeid)) {
    return res.redirect("/favourites");
  }
  user.favourites.push(homeid);
  await User.findByIdAndUpdate(userid, { favourites: user.favourites });
  res.redirect("/favourites"); 
};

exports.postFavouritesDelete = async (req, res, next) => {
  const homeid = req.body.homeid;
  const userid = req.session.user._id;
  const user = await User.findById(userid);
  
  user.favourites.pull(homeid);
  await User.findByIdAndUpdate(userid, { favourites: user.favourites });
  res.redirect("/favourites"); 

};
