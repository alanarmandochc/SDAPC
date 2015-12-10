var mongoose = require('mongoose');
var tablero = require('../models/tablero');
var usuarios = require('../models/usuario');
var miembros = require('../models/miembro');


/*
exports.index = function(req, res){
	console.log('Hola cosa fea index');
	if (req.session.usuario){
		res.render('usuarios/bienvenido',{ data : usuario });
	}else{
		console.log('Hola cosa fea');
		res.render('index', {title: 'hola'});
	}
};
*/
exports.login = function(req, res){

	usuarios.findOne({correo: req.body.email, contrasena: req.body.password}, function (err, usuario) {
	    if (err){
	    	res.json({
		    	type : false,
		    	data : "Lo sentimos, a ocurrido un error."
		    });
	    }else{
	    	if (usuario) {
	    		var arraytab=[];
	    		var tabmiembros;
	    		
	    		miembros.find({"id_usuario":usuario._id},function(err,tab){
	    			tabmiembros=tab;
	    			/*
	    			console.log("long : "+tabmiembros.length);
	    			cad = String(tabmiembros[0].id_tablero);
	    			tablero.findOne({"_id":cad},function(err,table){
	    				arraytab.push(table);
	    			});*/

	    			
	    		});
	    		req.session.usuario = usuario;
	    		//console.log(tabmiembros);
	    		
	    		var cadena = String(usuario._id);
	    		tablero.find({ "usuario" : cadena }, function(error, items){
					if(error){
						res.send('Ha surgido un error.');
					}else{
						

						//console.log("A  : "+arraytab.length);
						res.render('usuarios/bienvenido',{ usuario : req.session.usuario, tablas: items,tableros_miembro:tabmiembros });
						
					}						
				})
	    	}else{
	    		res.render('index', {title: 'Lo sentimos, aún no estás registrado '});
	    	};
	    	
	    }
	});
}

exports.logout = function(req, res){
	req.session.destroy();
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/');
    /*
	delete req.session.usuario;
    req.session.destroy();
    res.render('index', {title: ''});
	*/
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


exports.todos = function(req, res){
	usuarios.find(function(err,datos){
		res.send({data:datos})
	});
};

exports.getNameById = function(req, res){
	usuarios.findOne({"_id":req.body.id},function(err,datos){
		res.send(datos.nombre);
	});
};