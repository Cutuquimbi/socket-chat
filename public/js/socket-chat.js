var myHeaders = new Headers();
var socket = io('/chat.html');
//var express = require('express');
//ar app = express();

socket.on('connect', function() {

    console.log('Conectado al servidor.');

    socket.on('entrarChat', function(data) {

        renderizarSalas(data.usuario.grupos);

        if (data.sesion === "true") {

            localStorage.setItem('token', data.token);
            localStorage.setItem('nombre', data.usuario.nombre);
            localStorage.setItem('id', data.usuario._id);
        } else {

            myHeaders.set('token', data.token);
            myHeaders.set('nombre', data.usuario.nombre);
            myHeaders.set('id', data.usuario._id);
        }
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat



// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {


});