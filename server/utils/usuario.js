const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');

const { verificaToken, verificaAdmin } = require('../middlewares/autenticacion');
const Usuario = require('../models/usuario');



app.post('/register.html', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email.toLowerCase(),
        password: bcrypt.hashSync(body.password, 10)
    })

    usuario.save((err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.redirect('/done.html');
    });
});

/*app.put('/modificara/:id', [verificaToken, verificaAdmin], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', '.img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });


});

app.delete('/usuario/:id', [verificaToken, verificaAdmin], (req, res) => {

    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});*/


module.exports = app;