var mongoose = require('mongoose');
var tableros = require('../models/tablero');
var listas = require('../models/lista');


exports.index = function(req, res){
	var nombreT = req.body.nombre;
	var tablero = new tableros({
		nombre: req.body.nombre,
        color: "gray",
        //usuario:req.body.userid req.session.ususario._id
        usuario:req.session.usuario._id
	});
	tablero.save(function(error, documento){
		if(error){
			res.send('Error al intentar guardar el tablero.' + error);
		}else{
			res.send({msj:"tablero Guardado"});
			/*
			var cadena = String(req.session.usuario._id);
			tableros.find({ "usuario" : cadena }, function(error, items){
				if(error){
					res.send('Ha surgido un error.');
				}else{
					res.render('usuarios/bienvenido',{ usuario : req.session.usuario , tablas: items});
				}
			})
			*/
		}
	});

};

exports.areatrabajo = function  (req, res) {
	var cadena = String(req.body.id);
	var colorTab;
	tableros.findOne({"_id":cadena},function(err,tab){
		colorTab = tab.color;
	})

	listas.find({ "tablero" : cadena }, function(error, items){
				if(error){
					res.send('Ha surgido un error.');
				}else{
					req.session.tablero = req.body.id;
					req.session.tableronombre = req.body.nombre;
					res.render('tableros/index',{usuario : req.session.usuario,id : req.session.tablero ,nombre: req.session.tableronombre , listas: items ,color:colorTab});
					//res.render('usuarios/bienvenido',{ usuario : req.body.user , tablas: items});
				}
			})
	//res.render('tableros/index',{id : req.body.id ,nombre: req.body.nombre});
}

//metodo para tableros colaborativos
exports.areacolaborativa = function  (req, res) {
	var cadena = String(req.body.id);
	console.log(cadena);
	var colorTab;
	var nombreTab;
	tableros.findOne({"_id":cadena},function(err,tab){
		colorTab = tab.color;
		nombreTab = tab.nombre;
	})

	listas.find({ "tablero" : cadena }, function(error, items){
				if(error){
					res.send('Ha surgido un error.');
				}else{
					req.session.tablero = req.body.id;
					req.session.tableronombre = nombreTab;
					res.render('tableros/index',{usuario : req.session.usuario,id : req.session.tablero ,nombre: req.session.tableronombre , listas: items ,color:colorTab});
					//res.render('usuarios/bienvenido',{ usuario : req.body.user , tablas: items});
				}
			})
	//res.render('tableros/index',{id : req.body.id ,nombre: req.body.nombre});
}
/////////////////////////////////////////////

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
	tableros.update({"_id":idd},{nombre:nm},function(error){
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
    tableros.remove({"_id": id}, function(err){
	       if (err) {
	       		console.log(err)
	       }else{
	       		res.send("tablero eliminado")
	       }
    });
}

exports.cambiarColor = function(req,res){
	var colorn = String(req.body.color);
	var id = String(req.body.id);
	tableros.update({"_id":id},{color:colorn},function(error){
		if(error){
			console.log(error);
			res.send({msj:"Erro al actualilzar"});
		}else{
			res.send({msj:"actualizado"});
		}
		
	})
}