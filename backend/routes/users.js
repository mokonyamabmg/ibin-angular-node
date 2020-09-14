const express = require("express");

const UserController = require('../controllers/users');
const router = express.Router();

//signUp
router.post("/signup", UserController.createUser);


//Login
router.post("/login", UserController.userLogin);

//logout
router.post('/logout', UserController.userLogout);

router.get('/getAuth/:id', UserController.getAuth);

module.exports = router;
