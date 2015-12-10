var mongoose = require('mongoose');

var CardSchema = mongoose.Schema({
	nombre: String,
  	id_lista: String
});

module.exports = mongoose.model('Card', CardSchema);