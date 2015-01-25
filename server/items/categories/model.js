var mongoose          = require('mongoose');
/*
Schema for item categories
*/
var CategoriesSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = CategoriesSchema;
