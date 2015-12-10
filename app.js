//Rutas
var routes = require('./routes');
var usuarios = require('./routes/usuarios');
var tablero = require('./routes/tablero');
var lista = require('./routes/lista');
var miembro = require('./routes/miembro');
//Modulos que se requieren para la Aplicación
var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var mongodb = require('mongodb');


var app = express();

//Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(methodOverride());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ resave: true, saveUninitialized: true, secret: 'uwotm8' ,keys: ['key1', 'key2']}));

//Conexión a la base de datos usuario
mongoose.connect('mongodb://localhost/trello', function(error){
	if(error){
		throw error;
	}else{
		console.log('Conectado a MongoDB');
	}
});



app.get('/', routes.index);
//app.get('/', routes.bienvenido);
app.get('/usuarios/registrar', routes.registro);
//app.get('', usuarios.index);
app.post('/usuarios', usuarios.registro);
app.post('/usuarios/login', usuarios.login);
app.get('/usuarios/login', routes.index);
app.post('/usuarios/getTodos', usuarios.todos);
app.post('/usuarios/getNameById', usuarios.getNameById);
app.get('/usuarios/logout', usuarios.logout);

app.post('/tablero', tablero.index);
app.post('/tablero/areatrabajo', tablero.areatrabajo);
app.post('/tablero/areacolaborativa',tablero.areacolaborativa)
//app.get('/tablero/areatrabajo', tablero.areatrabajo);

/*
Actualizar Tablero
*/
app.post('/tablero/actualizar',tablero.actualizar)
app.post('/tablero/cambiarColor',tablero.cambiarColor)
/*****/
app.post('/tablero/eliminar',tablero.eliminar) ////Eliminar Tablero

//////////////////////////LISTAS
app.post('/lista/insertar', lista.insertar);
app.post('/lista/eliminar', lista.eliminar);
app.post('/lista/actualizar', lista.actualizar);

////////////miembros
app.post('/miembros/insertar',miembro.insertar);
app.post('/miembros/getByTablero',miembro.getByTablero);
app.post('/miembros/eliminar',miembro.eliminar);
/////////

var server = http.createServer(app);
var io = require("socket.io")(server);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function(socket){
	socket.on('disconnect', function (){
      console.log("Usuario desconectado")
      //cont--;
      //socket.emit('usuarios_conectados',{num:cont})
   });
 	
   socket.on('cambio',function(data){
      //console.log("Mensaje llego");
      //socket.emit('respuesta',{msj:"Yes ediel"})
      socket.broadcast.emit('cambio',{html:data.dato});
   });

   socket.on('cambiarColorTablero',function(data){
      //console.log("Mensaje llego");
      //socket.emit('respuesta',{msj:"Yes ediel"})
      socket.broadcast.emit('cambiarColorTablero',{color:data.color});
   });
   
});
