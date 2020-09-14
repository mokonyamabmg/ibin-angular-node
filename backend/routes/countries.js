const express = require("express");

const CountryController = require("../controllers/countries");
const router = express.Router();

//get all countries
router.get("/countries", CountryController.getAllCoutries);

module.exports = router;
