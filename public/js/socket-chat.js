 var socket = io();

 var params = new URLSearchParams(window.location.search);

 if (!params.has('nombre') || !params.has('sala')) {
     window.location = 'index.html';
     throw new Error('El nombre y sala son necesario');
 }

 var usuario = {
     nombre: params.get('nombre'),
     sala: params.get('sala')
 };


 socket.on('connect', function() {
     console.log('conectado');

     socket.emit('entrarChat', usuario, function(resp) {

         console.log(resp);
     });
 });


 socket.on('disconnect', function() {
     console.log('Perdimos conexion');


 });

 /*/Enviar informacion
 socket.emit('crearMensaje', {
     usuario: 'Jony',
     mensaje: 'Hola mundo'
 }, function(resp) {
     console.log('Respuesta server', resp);
 });*/

 //Escuchar informacion
 socket.on('crearMensaje', function(mensaje) {
     console.log('servidor', mensaje);
 })

 //Cambios de usuarios
 socket.on('listaPersonas', function(persona) {
     console.log(persona);
 })

 socket.on('mensajePrivado', function(mensaje) {
     console.log('Mensaje Privado:', mensaje)
 })