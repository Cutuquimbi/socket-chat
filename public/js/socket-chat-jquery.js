//referencias de jQuery
var divChats = $('#divSalas');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');
var cerrarSesion = $('#cerrar-sesion');

//Panel Izquierdo
var agregarGrupo = $('#agregar-grupo');
var btnCrearGrupo = $('#btn-crear-grupo');
var txtGrupo = $('#txtGrupo');
var swipe = $('.chat-rbox');


//popup
var overlay = $('#overlay');
var popup = $('#popup');
var crearGrupo = $('#crear-grupo');
var btnCerrar = $('#btn-cerrar');

var footer = $('footer');
var btnpanel = $('#btn-panel');
var panel = $('#panel1');

//Funciones para renderizar usuarios y salas
function renderizarUsuarios(personas) {

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {


        html += '<li>';
        html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);

}

function renderizarSalas(salas) {

    var html = '';

    for (var i = 0; i < salas.length; i++) {


        html += '<li>';
        html += '    <a data-id="' + salas[i]._id + '" href="Grupo">' + salas[i].nombre + '</a>';
        html += '</li>';
    }

    divChats.html(html);
}

//Mensajes
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

        html += '<li class="fadeIn">';
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

//Listener
cerrarSesion.on('click', function() {

    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    window.location.assign('/');

})

divChats.on('click', 'a', function() {

    var id = $(this).data('id');

    if (id) {
        myHeaders.append('chat', id);
    }
    socket.emit('join', myHeaders.get('chat'));
});

swipe.on('swiperight', function() {

    panel.toggleClass('open-pnl');
});

btnpanel.on('click', function() {

    panel.toggleClass('open-pnl');
});

agregarGrupo.on('submit', function(e) {
    e.preventDefault();

    if (txtGrupo.val().trim().length === 0) {
        return;
    }

    socket.emit('agregarGrupo', {
        grupo: txtGrupo.val(),
        token: myHeaders.get('token') || localStorage.getItem('token')
    }, function(resp) {

        renderizarSalas(resp.grupos);
    })
});

btnCrearGrupo.on('click', function() {

    overlay.addClass('active');
    popup.addClass('active');
});
//popup
btnCerrar.on('click', function() {

    overlay.removeClass('active');
    popup.removeClass('active');
});

crearGrupo.on('submit', function(e) {

    e.preventDefault();
    let id = myHeaders.get('id') || localStorage.getItem('id');
    socket.emit('crearGrupo', { grupo: grupo.value, id: id }, function(resp) {
        console.log(resp);
    })
})

//mensajes
formEnviar.on('submit', function(e) {

    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    console.log(myHeaders.get('chat'));

    socket.emit('crearMensaje', {
        dest: myHeaders.get('chat'),
        nombre: myHeaders.get('nombre') || localStorage.getItem('nombre'),
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });
});