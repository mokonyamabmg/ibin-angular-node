const mongoose = require("mongoose");

//create a company database schema
const companySchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
  domicile: { type: String, required: true },
  founding_date: { type: String, required: true },
  ibin: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model("Company", companySchema);
