var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

//referencias de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

var footer = $('footer');
var btnpanel = $('#btn-panel');
var panel = $('#panel1');
var conNombre = 0;
var conAdmin = false;



//Funciones para renderizar usuarios
function renderizarUsuarios(personas) {

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {


        html += '<li>';
        html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);

}


function renderizarMensajes(mensaje, yo) {

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Admin') {
        adminClass = 'danger'
        conNombre = null;

    }


    if (yo) {

        var lista = $('.id-usuario');

        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        // lista[lista.length].has('h5').text() === 'Jony'
        if (lista.length === 0 || !lista.last().hasClass(mensaje.nombre)) {
            html += '<h5 class="id-usuario ' + mensaje.nombre + '">' + mensaje.nombre + '</h5>';

        }

        html += '<div class="bg bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        var lista = $('.id-usuario');

        html += '<li class="animated fadeIn">';
        html += '<div class="chat-content">';

        if (lista.length === 0 || !lista.last().hasClass(mensaje.nombre)) {
            html += '<h5 class="id-usuario ' + mensaje.nombre + '">' + mensaje.nombre + '</h5>';

        }

        html += '<div class="bg bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';


    }

    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

btnpanel.on('click', function() {

    if (panel.hasClass('open-pnl')) {
        panel.removeClass('open-pnl');
    } else {
        panel.addClass('open-pnl');
    }

});


//Listener
divUsuarios.on('click', 'a', function() {

    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function(e) {

    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });
});