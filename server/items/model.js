var mongoose          = require('mongoose');
var CoordinatesSchema = require('../retailers/coordinates/model.js');
/*
Schema for items
 - Name
 - Category
 - Vendor ID
 - [Coordinates]
*/
var ItemsSchema = new mongoose.Schema({
  name: {
    type      : String,
    required  : true
  },
  category: {
    type      : String,
    required  : true
  },
  retailer_id: String,
  coordinates: [CoordinatesSchema]
});

module.exports = mongoose.model('items',ItemsSchema);

