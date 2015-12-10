var mongoose = require('mongoose');

var ListaSchema = mongoose.Schema({
	nombre: String,
    orden: Number,
  	updated_at: { type: Date, default: Date.now },
  	tablero: String
});

module.exports = mongoose.model('Lista', ListaSchema);