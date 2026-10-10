const {check, validationResult} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    title: "Login",
    isLoggedIn: req.session.isLoggedIn,
    oldvalues: {},
    user:{},
  });
};

exports.postLogin = async (req, res, next) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user){
    return res.status(422).render('auth/login', {
      title: "Login",
      isLoggedIn : req.session.isLoggedIn,
      errors : ['Invalid email or password'],
      oldvalues: {email},
      user:{},
    })
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    return res.status(422).render('auth/login', {
      title: "Login",
      isLoggedIn : req.session.isLoggedIn,
      errors : ['Invalid email or password'],
      oldvalues: {email},
      user:{},
    })
  }
  req.session.isLoggedIn = true;
  req.session.user = JSON.parse(JSON.stringify(user.toObject())); // Debug line
  await req.session.save();
  console.log('Session after login:', req.session); // Debug line
  res.redirect('/');
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(()=>{
    res.redirect('/login');
  })
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", { title: "Signup", isLoggedIn : req.session.isLoggedIn, oldvalues:{}, user:{},});
};

exports.postSignup = [
  
  check('firstname')
    .trim()
    .isLength({min : 2 })
    .withMessage('First name length should be min 2')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Only letters allowed'),
  
  check('lastname')
    .trim()
    .isLength({min : 2 })
    .withMessage('Last name length should be min 2')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Only letters allowed'),
    
  check('email')
    .isEmail()
    .withMessage('Enter valid email')
    .normalizeEmail(),
    
  check('password')
    .trim()
    .isLength({min : 8})
    .withMessage('minimum length should be 8')
    .matches(/[A-Z]/)
    .withMessage('Use atleast 1 Uppercase')
    .matches(/[a-z]/)
    .withMessage('Use atleast 1 Lowercase')
    .matches(/[!@#$%^&*()_+<>?:"{}]/)
    .withMessage('Use atleast 1 Special character'),

  check('confirmpassword')
    .trim()
    .custom((value, {req})=>{
      if(value !== req.body.password)
        throw new Error('Password do not match')
      return true;
    }),

  check('usertype')
    .notEmpty()
    .withMessage('Usertype is required')
    .isIn(['guest','host'])
    .withMessage('Invlid Usertype'),

  check('tnc')
    .notEmpty()
    .withMessage('Accept t&c')
    .custom((value)=>{
      if(value !== 'on')
        throw new Error('Must Accept t&c ')
      return true;
    }),

  (req, res, next) => { // Checking pass conditions
    const {firstname, lastname, email, password, usertype} = req.body;
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).render('auth/signup', {
        title: "signup",
        isLoggedIn : req.session.isLoggedIn,
        errors : errors.array().map(err=> err.msg),
        oldvalues: {firstname, lastname, email, password, usertype},
        user:{},
      })
    }
      // create user and save

    bcrypt.hash(password, 12).then(hashedpassword => {
      const user = new User({firstname, lastname, email, password: hashedpassword, usertype});
      return user.save();
    }).then(() => {
      res.redirect('/login');
    }).catch(err => {
      res.status(500).render('auth/signup', {
        title: "signup",
        isLoggedIn : req.session.isLoggedIn,
        errors : [err.message],
        oldvalues: {firstname, lastname, email, password, usertype},
        user:{},
      })
    })
  }
];
