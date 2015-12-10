var mongoose = require('mongoose');

var TableroSchema = mongoose.Schema({
	nombre: String,
    color: String,
  	updated_at: { type: Date, default: Date.now },
  	usuario: String
});

module.exports = mongoose.model('Tablero', TableroSchema);