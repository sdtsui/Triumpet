var mongoose          = require('mongoose');
/*
Schema for coordinates of floorplan
e.g.: a rectangular floorplan with have 4 coordinates
e.g.: a hexagon floorplan with have 6 coordinates
*/
var CoordinatesSchema = new mongoose.Schema({
  x: Number,
  y: Number
});

module.exports = CoordinatesSchema;
