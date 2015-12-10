
/*
 * GET home page.
 */
var tablero = require('../models/tablero');
var miembros = require('../models/miembro');

exports.index = function(req, res){

  console.log('Esto tiene usuario:'+req.session.usuario);
  	var tabmiembros;
  	
  if (req.session.usuario){

  	miembros.find({"id_usuario":req.session.usuario._id},function(err,tab){
	   	tabmiembros=tab;
	    			
	});

  	var cadena = String(req.session.usuario._id);
	tablero.find({ "usuario" : cadena }, function(error, items){
	if(error){
		res.send('Ha surgido un error.');
	}else{
		res.render('usuarios/bienvenido',{ usuario : req.session.usuario, tablas: items ,tableros_miembro:tabmiembros });
	}						
	})
	//res.render('usuarios/bienvenido',{ usuario : req.session.usuario });
  }else{
	res.render('index', {title: ''});
  }

//  res.render('index', { title: '' });
};

exports.registro = function(req, res){
  res.render('usuarios/registrar', { title: 'Express' });
};


exports.bienvenido = function(req, res){
  res.render('usuarios/bienvenido');
};

exports.areatrabajo = function(req, res){
  res.render('tableros/index');
};
