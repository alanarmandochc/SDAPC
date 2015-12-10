var mongoose = require('mongoose');

var UsuarioSchema = mongoose.Schema({
	correo: String,
  	nombre: String,
  	contrasena: String,
  	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
