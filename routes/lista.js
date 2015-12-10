var mongoose = require('mongoose');
var listas = require('../models/lista');
var tableros = require('../models/tablero');


exports.insertar = function(req, res){
	///var or= parseInt(req.body.orden) +parseInt(1);
	console.log(req.session.tablero)
	
	var lista = new listas({
		nombre: req.body.nombrelista,
    	orden: 10,
  		tablero: req.session.tablero
	});
	lista.save(function(error, documento){
		if(error){
			res.send('Error al intentar guardar el tablero.' + error);
		}else{/*
				var cadena = String(req.session.tablero);
				listas.find({ "tablero" : cadena }, function(error, items){
				if(error){
					res.send('Ha surgido un error.');
				}else{
					res.render('tableros/index',{id : req.session.tablero ,nombre: req.session.tableronombre , listas: items });
					//res.render('usuarios/bienvenido',{ usuario : req.body.user , tablas: items});
				}
			})*/
			res.send({nueva:documento});
				//res.render('tableros/index',{id : req.body.tablero ,nombre: req.body.nombre , listas: items });
			/*
			var cadena = String(req.body.tablero);
			tableros.find({ "usuario" : cadena }, function(error, items){
				if(error){
					res.send('Ha surgido un error.');
				}else{
					res.render('usuarios/bienvenido',{ usuario : req.body.user , tablas: items});
				}
			})*/
			
		}
	});


};


/*
exports.update = function(req, res){
	listas.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar modificar el listas.');
		}else{
			var listas = documento;
			listas.nombre = req.body.nombre;
			listas.apellido = req.body.apellido;
			listas.biografia = req.body.biografia;
			listas.save(function(error, documento){
				if(error){
					res.send('Error al intentar guardar el listas.');
				}else{	
					res.redirect('/listas');
				}
			});
		}
	});
};
exports.destroy = function(req, res){
	req.body.
	listas.remove({_id: req.params.id}, function(error){
		if(error){
			res.send('Error al intentar eliminar el personaje.');
		}else{	
			res.redirect('/personajes');
		}
	});
};


exports.registro = function(req, res){
	var usuario = new usuarios({
		correo: req.body.email,
  		nombre: req.body.name,
  		contrasena: req.body.password
	});
	usuario.save(function(error, documento){
		if(error){
			res.send('Error al intentar guardar el Usuario.' + error);
		}else{	
			res.redirect('/');
		}
	});
};

*/

exports.actualizar = function(req,res){
	//console.log(req.body.id);
	/*
	var data = new tableros({
		nombre: req.body.nuevonombre,
		color:"magenta",
        usuario:req.session.usuario._id
        //usuario:req.session.usuario._id
	});*/
	var idd = String(req.body.id);
	var nm = String(req.body.nuevonombre);
	listas.update({"_id":idd},{nombre:nm},function(error){
		if(error){
			console.log(error);
			res.send({msj:"Erro al actualilzar"});
		}else{
			res.send({msj:"actualizado"});
		}
		
	})
	/*
	tablero.save(function(error, documento){
		if(error){
			res.send('Error al intentar guardar el tablero.' + error);
		}else{
			var cadena = String(req.session.usuario._id);
			tableros.find({ "usuario" : cadena }, function(error, items){
				if(error){
					res.send('Ha surgido un error.');
				}else{
					res.render('usuarios/bienvenido',{ usuario : req.session.ususario , tablas: items});
				}
			})
		}
	});*/
}


exports.eliminar = function(req,res){
	var id = req.body.id;
    listas.remove({"_id": id}, function(err){
	       if (err) {
	       		console.log(err)
	       }else{
	       		res.send("tablero eliminado")
	       }
    });
}