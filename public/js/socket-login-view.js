var socket = io();

var loginform = $('#loginform');
var checkSesion = $('#check-sesion')
var divE = $('.error')
var mensaje = $('.err');

if (localStorage.getItem('token')) {

    window.location.assign('/chat.html');
    socket.emit('info', { token: localStorage.getItem('token') });
} else {
    loginform.submit(function(e) {
        e.preventDefault();

        socket.emit('login', { email: email.value.toLowerCase(), password: password.value, sesion: checkSesion.val() }, function(resp) {

            if (resp.error === true) {

                mensaje.html(resp.mensaje)
                divE.animate({
                    height: "25px"
                }, 500)

            } else {

                window.location.assign('/chat.html');

                socket.emit('info', { token: resp.token, sesion: resp.sesion });
            }
        });
    });
}