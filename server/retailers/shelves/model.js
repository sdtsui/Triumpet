var mongoose          = require('mongoose');
var CoordinatesSchema = require('../coordinates/model.js');

/*
Schema for shelves' attributes
x and y reference coordinate of top-left corner
these four attributes are essential in order to render
them using D3.
*/
var ShelvesSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  width: Number,
  height: Number
});

module.exports = ShelvesSchema;
