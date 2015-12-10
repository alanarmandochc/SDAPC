
var socket = io.connect('http://192.168.43.180:3000');
var panel ;
var CardAEliminar;

var listasnum = 2;

var refTableroActualizar;
var refListaActualizar;

var colorTableroActual;

$(document).ready(function(){
	colorTableroActual = $("body").css('background-color');
	
    
	$( ".contenedor" ).sortable({
      connectWith: ".contenedor",
      start:function(){
        $('.panel').addClass('miclase');
      },
      stop:function(){
        $('.panel').removeClass('miclase');

      },
      update:function(e,ui){
      	//var aux = e.currentTarget.body.children[1].children[0].innerHTML;
      	//console.log($(this));
      }
    });
    
    $('.lista_body').sortable({
    	connectWith: ".lista_body",
    })

     
/*
    $('.lista').sortable({
    	connectWith: ".lista",
    })
*/

	$("#color").ColorPicker({
		color: '#0000ff',
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);

			return false;

		},
		onChange: function (hsb, hex, rgb) {
			$('#color div').css('backgroundColor', '#' + hex);
			//$('body').css('background','#'+hex);
			//cambiarColorTableroAjax('#'+hex);
		},
		onSubmit:function(hsb, hex, rgb){
			//alert("");
		}
	})


})

$(document).on('click','#AceptarCambiarColor',function(){
	colorSeleccionado  = $('#color div').css("background-color");
	cambiarColorTableroAjax(colorSeleccionado);
	$('#color div').css("background-color",colorSeleccionado);
	$('#contenidoTotal').css('background',colorSeleccionado);
	socket.emit('cambiarColorTablero',{color:colorSeleccionado})
})


var cambiarColorTableroAjax = function(hex){
	var idd = $("#idTablero").val();
	$.ajax({
		url:"/tablero/cambiarColor",
		type:"POST",
		data:{color:hex,id:idd},
		cache:false,
		timeout:5000,
		success:function(data){
			/*
			var newList = newListContent(text);
			//$(".contenedor").append(newList);
			location.reload();
			mostrarConfirmacionListas("Lista Guardada");
			socket.emit('prueba',{html:"yes"})
			//refTableroActualizar[0].children[2].innerHTML = nuevoNombre;
			//mostrarConfirmacion("Tablero Actualizado")
			//console.log(refTableroActualizar);
			//alert();
			//console.log(data);

			$('.btnNewList').removeClass('disabled');*/
			
		},
		error:function(data){
			console.log(data)
		}
	});
}



$(document).on('click','.btnNewCard',function(){
	var aux = this.id;
	panel = aux.substring(8,9);
	var newCard = newCardElement();
	$("#panel"+panel).append(newCard);
	$('.form-control').focus();
	$('.btnNewCard').addClass('disabled');
});




$(document).on('click','.btnAceptarCard',function(e){
	var text = $('#textoNewCard').val();
	var newCard = newCardElementText(text);
	$("#panel"+panel).append(newCard);
	$("p#auxElement").remove();
	$('.btnNewCard').removeClass('disabled');
	var allCards = document.getElementById('rowContenido').innerHTML
	
	
})

$(document).on('click','#btnCancelarCard',function(){
	
	$("p#auxElement").remove();
	$('.btnNewCard').removeClass('disabled');

})
$(document).on('click','.card',function(){

})
$(document).on('click','.btnVerItems',function(){
	$('#itemsCard').modal();
})

$(document).on('click','.deleteCard',function(){
	//$(this).parent().remove();
	
    CardAEliminar = $(this).parent();
	$("#modalConfirmDeleteCard").modal();
})


$(document).on('click','.actualizarCard',function(){
	var texto = $(this).parent().text();
	$('#textoActualizarCard').val(texto);
	$("#modalActualizarCard").modal();
	$('#textoActualizarCard').focus();

})
$(document).on('click','#btnAceptarEliminarCard',function(){
	CardAEliminar.remove();
	var allCards = document.getElementById('rowContenido').innerHTML;
	
	

})


var newCardElement = function(){
	var element = "<p class='alert alert-success card' id='auxElement'>"+
          "<input type='text' class='form-control' id='textoNewCard'  placeholder='texto nueva card' aria-describedby='basic-addon1'>"+
          "<button class='btn btn-default btnAceptarCard'>Aceptar</button>"+
          "<button class='btn btn-red' id='btnCancelarCard'>Cancelar</button></p>";
    return element;
}

var newCardElementText = function(text){
	var element = "<p class='well well-sm'>"+text+"  "+
	"<button type='button' class='btn btn-default actualizarCard' aria-label='Left Align'>"+
            "<span class='glyphicon glyphicon-refresh' aria-hidden='true'></span>"+
            "</button>"+
            "<button type='button' class='btn btn-default deleteCard' aria-label='Left Align'>"+
            "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"+
            "</button>"+
            "<button type='button' class='btn btn-default btnVerItems' aria-label='Left Align'>"+
            "<span class='glyphicon glyphicon-th-list'></span>"+
            "</button>"+
	"</p>";
    return element;
}


///////////////////////////////////////
$(document).on("click","#btnCambiarColorTablero",function(){
	
	color = $("#colorTablero").val();
	if(color==''){
		color = "WHITE";
	}
	$("#colorTablero").val('');

	
	

})


//////////////////////////////////////


$(document).on('click','.btnNewList',function(){
	var newList = newListElement();
	$("#panelx").prepend(newList);
        
        
	$('.form-control').focus();
	$('.btnNewList').addClass('disabled');
    
    
        /*
	var aux = this.id;
	panel = 2;
        var auxi = $(".listax");
        $(".listax").remove();
	var newList = newListContent();
	$(".contenedor").append(newList);
	$(".contenedor").append(auxi);
        */
});

var newListContent = function(text){
	var element = "<div class='lista'>"+
"  <div class='lista_head'>"+text+"</div>"+
"  <div id='panel1' class='lista_body'>"+
"  </div>"+
"  <div class='lista_footer'><a id='btnPanel1' class='btn btn-primary btnNewCard'>Nueva Card</a></div>"+
"</div>";

    return element;
}

var newListElement = function(){
	var element = "<p class='alert alert-success card' id='auxElementList'>"+
		  "<label>Nombre</label>"+
          "<input type='text' class='form-control' id='textoNewList'  placeholder='Nombre nueva lista' aria-describedby='basic-addon1'>"+
          "<button class='btn btn-default' id='btnAceptarList'>Aceptar</button>"+
          "<button class='btn btn-red' id='btnCancelarList'>Cancelar</button></p>";
    return element;
}

$(document).on('click','#btnAceptarList',function(e){
	var text = $('#textoNewList').val();
        
      
    var auxi = $(".listax");
    $(".listax").remove();
    $.ajax({
		url:"/lista/insertar",
		type:"POST",
		data:{nombrelista:text},
		cache:false,
		timeout:5000,
		success:function(data){
			//console.log(data);
			//var newList = newListContent(text);
			//$(".contenedor").append(newList);
			//location.reload();
			//var html = document.getElementById("contenidoTotal").innerHTML;
			///console.log(a);
			$('.btnNewList').removeClass('disabled');
			location.reload();
			
			socket.emit('cambio',{dato:"move"})
			//mostrarConfirmacionListas("Lista Guardada");
			//socket.emit('prueba',{html:"yes"})
			//refTableroActualizar[0].children[2].innerHTML = nuevoNombre;
			//mostrarConfirmacion("Tablero Actualizado")
			//console.log(refTableroActualizar);
			//alert();
			//console.log(data);

			
		},
		error:function(data){
			console.log(data)
		}
	});
    
	//var newList = newListContent(text);
	//$(".contenedor").append(newList);
	//$(".contenedor").append(auxi);
        
    //$("p#auxElementList").remove();
	//$('.btnNewList').removeClass('disabled');
	//var allCards = document.getElementById('rowContenido').innerHTML
        
	
});

/////////////////////// Eliminar Lista ///////////////////////////
$(document).on('click','.btnEliminarLista',function(){
	var id = $(this).attr('id');
	//alert(id);
	$("#idListaEliminar").val(id);
	$("#modalEliminarLista").modal();
})


$(document).on('click','#btnAceptarEliminarLista',function(){
	var idListaAEliminar = $("#idListaEliminar").val();
	//alert(idListaAEliminar);
	
	
	$.ajax({
		url:"/lista/eliminar",
		type:"POST",
		data:{id:idListaAEliminar},
		cache:false,
		timeout:5000,
		success:function(data){
			location.reload();
			socket.emit('cambio',{dato:"move"})
			//setTimeOut(1000);
			//mostrarConfirmacionListas("Lista Eliminada");

		},
		error:function(data){
			console.log(data)
		}
	});


});

///////////////// fin eliminar Lista ////////////////////////

$(document).on('click','#btnCancelarList',function(){
        $("p#auxElementList").remove();
	$('.btnNewList').removeClass('disabled');
})

//////////////////////////////////////// ACTUALIZAR LISTAS

$(document).on('click','.btnActualizarLista',function(){
	var id=$(this).attr('id');
	//alert(id);
	
	var formPadre = $(this).parent().parent();
	refListaActualizar = formPadre;
	
	//console.log(formPadre[0].children[0].innerHTML);
	
	$("#textoNuevoNombreLista").val(formPadre[0].children[0].innerHTML);
	$("#idListaActualizar").val(id);// poniendo el id del tablero a actualizar el hiden del modal
	
	$("#modalActualizarLista").modal();
	$("#textoNuevoNombreLista").focus();
})

$(document).on('click','#btnAceptarActualizarLista',function(){
	var nuevoNombre = $("#textoNuevoNombreLista").val();
	if(nuevoNombre==''){
		mostrarConfirmacionListas("El nombre de la lista no puede ser vacio");
		return;
	}
	var idTablero = $("#idListaActualizar").val();
	//alert(idTablero);
	

	$.ajax({
		url:"/lista/actualizar",
		type:"POST",
		data:{nuevonombre:nuevoNombre,id:idTablero},
		cache:false,
		timeout:5000,
		success:function(data){
			//data.msj
			refListaActualizar[0].children[0].innerHTML = nuevoNombre;
			mostrarConfirmacionListas("Lista Actualizada")
			socket.emit('cambio',{dato:"move"})
			//console.log(refTableroActualizar);
			//alert();
			//console.log(data);
		},
		error:function(data){
			console.log(data)
		}
	});


});


/////////////////////////////////////////////// FIN ACTUALIZAR LISTAS


/***************************************************/
/*
Actualizar Nombre del tablero
*/
$(document).on('click','.btnActualizarTablero',function(){
	var id=$(this).attr('id');
	//alert(id);
	var formPadre = $(this).parent();
	refTableroActualizar = formPadre;
	//console.log(formPadre[0][0].value);

	$("#textoNuevoNombreTablero").val(formPadre[0].children[0].value);
    //alert(formPadre[0].children[0].value);
    //console.log(formPadre);
	$("#idTableroActualizar").val(id);// poniendo el id del tablero a actualizar el hiden del modal
	
	$("#modalActualizarTablero").modal();
	$("#textoNuevoNombreTablero").focus();
})

$(document).on('click','#btnAceptarActualizarTablero',function(){
	var nuevoNombre = $("#textoNuevoNombreTablero").val();
	if(nuevoNombre==''){
		mostrarConfirmacion("El nombre del tablero no puede ser vacio");
		return;
	}
	var idTablero = $("#idTableroActualizar").val();
	//alert(idTablero);
	

	$.ajax({
		url:"/tablero/actualizar",
		type:"POST",
		data:{nuevonombre:nuevoNombre,id:idTablero},
		cache:false,
		timeout:5000,
		success:function(data){
			//data.msj
			refTableroActualizar[0].children[2].innerHTML = nuevoNombre;
			mostrarConfirmacion("Tablero Actualizado")
            location.reload();
			//console.log(refTableroActualizar);
			//alert();
			//console.log(data);
		},
		error:function(data){
			console.log(data)
		}
	});


});

var mostrarConfirmacion= function(msj){
	$("#mensajesTableros").empty();
	$("#mensajesTableros").append("<h3>"+msj+"</h3>");
	$("#mensajesTableros").slideDown(2000,function(){
		$(this).hide(2000);
	});
}
var mostrarConfirmacionListas=function(msj){
	$("#mensajesListas").empty();
	$("#mensajesListas").append("<h3>"+msj+"</h3>");
	$("#mensajesListas").slideDown(2000,function(){
		$(this).hide(2000);
	});
}

/***************************************************/
/*
Nuevo Tablero
*/
$(document).on('click','#nuevoTablero',function(){
	
	$("#modalCrearTablero").modal();
})

$(document).on('click','#btnAceptarCrearTablero',function(){
	var nombreTablero = $("#textoNombreNuevoTablero").val();
	//alert(nombreTablero);
	if(nombreTablero==''){
		mostrarConfirmacion("El nombre del tablero no puede ser vacio");
		return;
	}
	$.ajax({
		url:"/tablero",
		type:"POST",
		data:{nombre:nombreTablero},
		cache:false,
		timeout:5000,
		success:function(data){
			mostrarConfirmacion("Tablero Creado")
			location.reload();
			//data.msj
			//refTableroActualizar[0].children[2].innerHTML = nuevoNombre;
			//mostrarConfirmacion("Tablero Actualizado")
			//console.log(refTableroActualizar);
			//alert();
			//console.log(data);
		},
		error:function(data){
			console.log(data)
		}
	});


})
/*fin nuevo tablero********************************************/

/*Eliminar Tablero*/

$(document).on('click','.btnEliminarTablero',function(){
	var id=$(this).attr('id');

	$("#idTableroEliminar").val(id);
	$("#modalEliminarTablero").modal();
	
})

$(document).on('click','#btnAceptarEliminarTablero',function(){
	var idTableroAEliminar = $("#idTableroEliminar").val();
	//alert(idTableroAEliminar);
	


	$.ajax({
		url:"/tablero/eliminar",
		type:"POST",
		data:{id:idTableroAEliminar},
		cache:false,
		timeout:5000,
		success:function(data){
			mostrarConfirmacion("Tablero Eliminado");
		},
		error:function(data){
			console.log(data)
		}
	});


});
/**/

/*Socket*/

socket.on('cambiarColorTablero',function(data){
	$("#contenidoTotal").css('background',data.color);;
	$('#color div').css('background',data.color);
});

socket.on('cambio',function(data){

	location.reload();

	//document.getElementById("contenidoTotal").innerHTML = data.html;
});
/**
*Funciones para agregar miembros y quitar miembros
*
*/

$(document).on('click','.btnAgregarMiembro',function(){
	var idTablero=$(this).attr('id');

	var idUsuarioActual = $("#idUsuario").val();

	$.ajax({
		url:"/usuarios/getTodos",
		type:"POST",
		data:{nombre:"a"},
		cache:false,
		timeout:5000,
		success:function(data){
			//console.log(data)
			$("#areaUsuariosInvitar").empty();
			for (var i = 0; i < data.data.length; i++) {
				//alert(data.data[i].nombre);
				if(data.data[i]._id!=idUsuarioActual){
					var n="<div class='alert alert-success' id='"+data.data[i]._id+"'>"+data.data[i].nombre+"       <button class='btn btn-default btnAceptarAgregarMiembro' data-dismiss='modal' id='"+idTablero+"'>Agregar Miembro</button></div>";
					$("#areaUsuariosInvitar").append(n);
				}
			};
			$("#modalInvitarUsuarios").modal();
			//data.msj
			//refTableroActualizar[0].children[2].innerHTML = nuevoNombre;
			//mostrarConfirmacion("Tablero Actualizado")
			//console.log(refTableroActualizar);
			//alert();
			//console.log(data);
		},
		error:function(data){
			console.log(data)
		}
	});
})

$(document).on('click','.btnAceptarAgregarMiembro',function(){
	idMiembro = $(this).parent().attr('id');
	idTablero = $(this).attr('id');
	console.log(idMiembro);
	console.log(idTablero);

	$.ajax({
		url:"/miembros/insertar",
		type:"POST",
		data:{idusuario:idMiembro,idtablero:idTablero},
		cache:false,
		timeout:5000,
		success:function(data){
			//mostrarConfirmacion("Miembro ");
			console.log(data);
			if(data.respuesta=='true'){
				mostrarConfirmacion('Miembro Agregado Correctamente')
                socket.emit('cambio',{dato:"move"});
			}else{
				mostrarConfirmacion('Ese usuario ya es miembro de ese tablero');
			}
			//alert("Se creo miembro")
		},
		error:function(data){
			console.log(data)
		}
	});
})

$(document).on('click','.btnEliminarMiembro',function(){
	var idTablero=$(this).attr('id');
	//alert(idTablero);
	
	$.ajax({
		url:"/miembros/getByTablero",
		type:"POST",
		data:{idtablero:idTablero},
		cache:false,
		timeout:5000,
		success:function(data){
			//mostrarConfirmacion("Miembro ");
		
			console.log(data);
			
			$("#areaUsuariosEliminar").empty();
			for (var i = 0; i < data.length; i++) {
				//alert(data.data[i].nombre);
				var n="<div class='alert alert-danger' id='"+data[i].id_usuario+"'>   "+data[i].nombreUsuario+"       <button class='btn btn-primary btnAceptarEliminarMiembro' data-dismiss='modal' id='"+idTablero+"'>Eliminar Miembro</button></div>";
				$("#areaUsuariosEliminar").append(n);
								
				
			};
			$("#modalEliminarUsuarios").modal();

		},
		error:function(data){
			console.log(data)
		}
	});

});

$(document).on('click','.btnAceptarEliminarMiembro',function(){
	idMiembro = $(this).parent().attr('id');
	idTablero = $(this).attr('id');
	
	
	
	$.ajax({
		url:"/miembros/eliminar",
		type:"POST",
		data:{idusuario:idMiembro,idtablero:idTablero},
		cache:false,
		timeout:5000,
		success:function(data){
			//mostrarConfirmacion("Miembro ");
			console.log(data);
			if(data=='true'){
				mostrarConfirmacion('Miembro Eliminado')
                socket.emit('cambio',{dato:"move"});
			}else{
				mostrarConfirmacion('Miembro NO Eliminado');
			}
			
		},
		error:function(data){
			console.log(data)
		}
	});
});