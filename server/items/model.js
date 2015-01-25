var mongoose          = require('mongoose');
var CoordinatesSchema = require('../retailers/coordinates/model.js');
/*
Schema for items
 - Name
 - Categories ID
 - [Coordinates]
*/
var ItemsSchema = new mongoose.Schema({
  name: String,
  categories_id: String,
  retailer_id: String,
  coordinates: [CoordinatesSchema]
});

module.exports = mongoose.model('items',ItemsSchema);

