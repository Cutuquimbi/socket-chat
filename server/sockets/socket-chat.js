const { io } = require('../server');

const Usuario = require('../models/usuario');
const Sala = require('../models/sala');
const { verificaToken } = require('../middlewares/autenticacion');

const { crearMensaje } = require('../utils/utilidades');

const chat = io.of('/chat.html');

chat.on('connection', (client) => {

    /*client.on('entrarChat', (iden) => {
        verificaToken(iden.token)


         usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se unio`));

        callback(usuarios.getPersonasPorSala(data.sala)); 

    });*/

    client.on('agregarGrupo', (data, callback) => {

        let usuario = verificaToken(data.token);
        let dB = data.grupo.split('#', 2);
        let cambiaGrupo = {
            _id: dB[0],
            nombre: dB[1]
        }

        Usuario.findByIdAndUpdate(usuario._id, { $push: { grupos: cambiaGrupo } }, { new: true, runValidators: true }, (err, usuarioDB) => {
            if (err) {
                return callback({
                    error: true,
                    mensaje: 'Error'
                });
            }
            return callback({
                error: false,
                mensaje: 'Grupo añadido',
                grupos: usuarioDB.grupos
            });

        });

    });

    client.on('crearGrupo', (data, callback) => {

        let sala = new Sala({
            nombre: data.grupo,
            admins: data.id
        });

        sala.save((err) => {
            if (err) {
                return callback({
                    error: true,
                    mensaje: err
                });
            }

            return callback({
                error: false
            });
        });
    });

    client.on('crearMensaje', (data, callback) => {

        let mensaje = crearMensaje(data.nombre, data.mensaje);
        client.broadcast.in(data.dest).emit('crearMensaje', mensaje);

        callback(mensaje);
    });

    client.on('join', (sala) => {
        client.join(sala);
    });

    client.on('disconnect', () => {

        //let personasBorradas = usuarios.borrarPersonas(client.id);

        //client.broadcast.to(personasBorradas.sala).emit('crearMensaje', crearMensaje('Admin', `${personasBorradas.nombre} salio`));
        //client.broadcast.to(personasBorradas.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personasBorradas.sala));
    });


});