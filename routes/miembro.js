var mongoose = require('mongoose');
var listas = require('../models/lista');
var tableros = require('../models/tablero');
var usuarios = require('../models/usuario');
var miembros = require('../models/miembro');


exports.insertar = function(req, res){
	///var or= parseInt(req.body.orden) +parseInt(1);
	//console.log(req.session.tablero)
	
	miembros.find({'id_usuario':req.body.idusuario,'id_tablero':req.body.idtablero},function(err,doc){
		//console.log(doc);
		//console.log("L: "+doc.length)
		if (doc.length==0) {
			var idd =String(req.body.idtablero);
			
			tableros.findOne({'_id':idd},function(err,tab){
				var idUser = String(req.body.idusuario);
				usuarios.findOne({'_id':idUser},function(err,datos){
					var miembro = new miembros({
						nombreUsuario:datos.nombre,
						id_usuario: req.body.idusuario,
		    			id_tablero: req.body.idtablero,
		    			color: tab.color,
		    			nombre: tab.nombre
					});

					miembro.save(function(error, documento){
						if(error){
							res.send('Error al intentar guardar el tablero.' + error);
						}else{
							res.send({nueva:documento});
							
							
						}
					});
				//console.log(miembro);
				});
				//console.log(tab);
				/*
				var miembro = new miembros({
					nombreUsuario:
					id_usuario: req.body.idusuario,
	    			id_tablero: req.body.idtablero,
	    			color: tab.color,
	    			nombre: tab.nombre
				});
				//console.log(miembro);
				/*
				miembro.save(function(error, documento){
					if(error){
						res.send('Error al intentar guardar el tablero.' + error);
					}else{
						res.send({nueva:documento});
						
						
					}
				});*/
			});
			res.send({respuesta:'true'})
			/*
			var miembro = new miembros({
				id_usuario: req.body.idusuario,
	    		id_tablero: req.body.idtablero
			});
			miembro.save(function(error, documento){
				if(error){
					res.send('Error al intentar guardar el tablero.' + error);
				}else{
					res.send({nueva:documento});
					
					
				}
			});*/
			//console.log("paso lg: "+doc.length);
		}else{
			res.send({respuesta:'false'})
		}
	});
	//console.log("paso lg: "+lg);
	
	
}

exports.getByTablero = function(req, res){

	miembros.find({'id_tablero':req.body.idtablero},function(err,doc){
		res.send(doc);
	});
}

exports.eliminar = function(req, res){

	miembros.remove({"id_usuario": req.body.idusuario,"id_tablero":req.body.idtablero}, function(err){
	       if (err) {
	       		console.log(err)
	       }else{
	       		res.send("true")
	       }
    });
}