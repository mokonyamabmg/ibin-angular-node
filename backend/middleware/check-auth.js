const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  //split the authorized token after the bearer word

  try{
    const token = req.headers.authorization.split(" ")[1];
    //verify method recieves the decoded token
    const decodedToken = jwt.verify(token, 'secret_used_for_token_generation_this_has_to_be_long');
    //add email and user id to request generated from request header
    req.userData = { email: decodedToken.email, userId: decodedToken.userId};
    next();
  }catch(error) {
    res.status(401).json({message: 'You are not authenticated'});
  }
}
