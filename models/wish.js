var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WishSchema = new Schema(
  {
    description: {type: String, required: true},
    price: {type: Number, required: true},
    purchased: {type: Boolean, required: true},
  }
);

//Export model
module.exports = mongoose.model('Wish', WishSchema);