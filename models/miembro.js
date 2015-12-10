var mongoose = require('mongoose');

var MiembroSchema = mongoose.Schema({
	nombreUsuario:String,
	id_usuario: String,
    id_tablero: String,
    color:String,
    nombre:String
});

module.exports = mongoose.model('Miembro', MiembroSchema);