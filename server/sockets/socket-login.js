const { io } = require('../server')
const Usuario = require('../models/usuario');
const { verificaToken } = require('../middlewares/autenticacion');

const bcrypt = require('bcrypt');
const _ = require('underscore');
const jwt = require('jsonwebtoken');

const login = io.of('/');

login.on('connection', (client) => {

    client.on('login', (data, callback) => {

        Usuario.findOne({ email: data.email }, (err, usuarioDB) => {
            if (err) {
                return callback({
                    error: true,
                    mensaje: 'Error'
                });
            }

            if (!usuarioDB) {

                return callback({
                    error: true,
                    mensaje: 'Nombre de usuario o contraseña incorrecto'
                });
            }

            if (!bcrypt.compareSync(data.password, usuarioDB.password)) {

                return callback({
                    error: true,
                    mensaje: 'Nombre de usuario o contraseña incorrecto'
                });
            }

            let token = jwt.sign({
                usuario: usuarioDB
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

            return callback({
                error: false,
                token,
                sesion: data.sesion
            });

        });
    });

    client.on('info', (data) => {

        io.of('/chat.html').on('connection', (client) => {
            let usuario = verificaToken(data.token)
            client.emit('entrarChat', { usuario, token: data.token, sesion: data.sesion });

        });
    });
});