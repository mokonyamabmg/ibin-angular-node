const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Country', countrySchema);
