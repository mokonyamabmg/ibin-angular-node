const mongoose = require('mongoose');

const supportSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
})


module.exports = mongoose.model("Support", supportSchema);
