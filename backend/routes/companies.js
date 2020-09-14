const express = require("express");
const extractFile = require("../middleware/file");
const checkAuth = require("../middleware/check-auth");
const CompanyController = require("../controllers/companies");

const router = express.Router();



router.post("/create",checkAuth, extractFile, CompanyController.createCompany);
router.get("", CompanyController.getCompanies);
router.get("/User/:id" , checkAuth, CompanyController.getCompaniesByUser);
router.get("/:id", CompanyController.getCompany);
router.put("/edit/:id",checkAuth, extractFile, CompanyController.updateCompany);

module.exports = router;
