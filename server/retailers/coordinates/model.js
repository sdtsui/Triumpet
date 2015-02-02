var mongoose          = require('mongoose');
/*
Schema for coordinates of floorPlan.
These coordinates could be interpreted as verticies of a floorPlan.
e.g.: a rectangular floorplan will have 4 coordinates.
e.g.: a hexagonal floorplan will have 6 coordinates.
*/
var CoordinatesSchema = new mongoose.Schema({
  x: Number,
  y: Number
});

module.exports = CoordinatesSchema;
