// core module
const path = require('path');

// externla module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { default: mongoose } = require('mongoose');
const multer = require('multer');
const url = "mongodb+srv://root:root@airbnb.sacjm0b.mongodb.net/airbnb?appName=Airbnb";

// local module
const userRoute = require('./routes/storeRouter');
const {hostRouter} = require('./routes/hostRouter');
const authRouter = require('./routes/authRouter');
const rootDir = require('./utils/rootDir');
const {error404} = require('./controllers/errors');


const app = express();

app.set('view engine' ,'ejs');
app.set('views','./views'); // first views is constant 2nd one is folder location in which i want to look for ejs files always without importing

const store = new MongoDBStore({
  uri : url,
  collection: 'session',
})

const multerOptions = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Specify the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname); // Create a unique filename
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only image files are allowed!'), false); // Reject the file
    }
  }
};

app.use(express.static(path.join(rootDir, 'public')));
app.use("/uploads", express.static(path.join(rootDir, 'uploads')));
app.use("/host/uploads", express.static(path.join(rootDir, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(multer(multerOptions).single('photo')); // 'photo' is the name of the file input field in the form
app.use(session({
  secret : 'dky',
  resave: false,
  saveUninitialized: true,
  store
}))


app.use((req,res,next)=>{
  console.log(req.url, req.method);
  next();
})
app.use(authRouter);
app.use(userRoute);
app.use("/host",(req,res,next)=>{
  if(req.session.isLoggedIn)
    next();
  else
    res.redirect("/login");
})
app.use("/host", hostRouter);
app.use(error404);


const port = 4000;

mongoose.connect(url).then(()=>{
  console.log("Connected to MongoDb.....");
  app.listen(port,()=>{console.log(`server running at http://localhost:${port}`)})
}).catch((err)=>{
  console.log("error Occured while connecting Mongodb", err);
});
