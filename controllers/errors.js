exports.error404 = (req,res ,next)=>{
  res.status(404).render('404not', {title:'Page not Found', isLoggedIn : req.session.isLoggedIn, user: req.session.user,});
}