const { io } = require('../server')

const { Usuarios } = require('../clases/usuarios');
const { crearMensaje } = require('../utils/utilidades')

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

        client.join(data.sala);

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));

        callback(usuarios.getPersonasPorSala(data.sala));

    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    })

    client.on('disconnect', () => {

        let personasBorradas = usuarios.borrarPersonas(client.id);

        client.broadcast.to(personasBorradas.sala).emit('crearMensaje', crearMensaje('Admin', `${personasBorradas.nombre} salio`))
        client.broadcast.to(personasBorradas.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personasBorradas.sala));
    });

    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    });


});