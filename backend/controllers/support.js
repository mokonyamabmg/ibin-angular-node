const express = require("express");

const SupportController = require("../controllers/support");
const router = express.Router();

//create support message
router.post("/support", SupportController.createMessage);


module.exports = router;
