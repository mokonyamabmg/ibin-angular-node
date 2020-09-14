//made to construct paths so file path on the backend can be found
const path = require('path');

//import mongoose
const mongoose = require("mongoose");

// const MONGODB_URI = 'mongodb+srv://Gadifele:0zgIO8FteSZbEU9Q@cluster0-ngt90.mongodb.net/test';
const MONGODB_URI = 'mongodb+srv://ibinv2:TDCVp95N99td50rb@cluster0.po4rd.mongodb.net';


//import express js
const express = require("express");
//import body parser
const bodyParser = require("body-parser");

const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);

const userRoutes = require("./routes/users");
const companyRoutes = require("./routes/companies");

const app = express();
// const store = new MongoDBStore({
//   uri: MONGODB_URI,
//   collection: 'sessions'
// });

//create db connection
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log("database connected");
})
.catch(() => {
  console.log("database not connected")
});

//add body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//make an image folder accessible using a request for front end
app.use("/images", express.static(path.join("backend/images")));

// app.use(session({
//   secret: 'my secret',
//    resave: false,
//     saveUninitialized: false,
//     store: store
//   })
//   );

// add cors middlware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});



//routes
app.use("/api/company", companyRoutes);
app.use("/api/user", userRoutes);


module.exports = app;
