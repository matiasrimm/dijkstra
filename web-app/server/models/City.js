var mongoose = require('mongoose');

// Create the CitySchema.
var CitySchema = new mongoose.Schema({
  name: String,
  coordX: Number,
  coordY: Number,
  neighbours: {
    name: String,
    distance: Number
  }
}, {collection:'city'});

// Export the model.
module.exports = mongoose.model('City', CitySchema);
