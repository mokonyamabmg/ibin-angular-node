//import bcrypt
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//send email
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


// const transport = nodemailer.createTransport(sendgridTransport({
//   auth: {
//     apikey:
//   }
// }));
exports.getAuth = (req, res, next) => {
  User.findById(req.params.id)
  .then(user => {

    res.status(200).json({user: user});

  })
  .catch(err => {
    res.status(200).json({message: "Failed to get Authenticated User"});
  });
};

exports.createUser = (req, res, next) => {

//hash password
bcrypt.hash(req.body.password, 10)
.then(hash => {
  //create user object with hashed password
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    password: hash
  });

  user.save()
    .then(result => {
      res.status(201).json({
        message: 'User created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Server Error, Unable to create user!'
      });
    })
});
}

exports.userLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
  });
};

exports.userLogin = (req, res, next) => {

  let fetchedUser;

  //find user with email
  User.findOne({ email: req.body.email })
  .then(user => {
    //return an error if the is no user
    if(!user)
    {
      return res.status(401).json({
        message: "Authencation Failed, User doesnt Exist"
      });
    }

    //if user is found compare passwords
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);

  })
  .then(result => {

    //if password dont match return with error message
    if(!result)
    {
      return res.status(401).json({
        message: 'Authentication Failed, Incorrect Credentials'
      });
    }

    // generate token
    const token = jwt.sign(
      {
          email: fetchedUser.email,
          userId: fetchedUser._id
      },
        'secret_used_for_token_generation_this_has_to_be_long',
      {
        expiresIn: "1h"
      }
      );




      //return with object containing token, expiration time, and user id
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        name: fetchedUser.name,
        userId: fetchedUser._id,
        surname: fetchedUser.surname,
        email: fetchedUser.email
      });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Authentication failed'
    });
  })
};
