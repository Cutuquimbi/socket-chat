const jwt = require('jsonwebtoken');

//======================
//Verifica token
//======================
let verificaToken = (token) => {

    let usuario;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            console.log('antes antes')
            return {
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            };
        }

        usuario = decoded.usuario;

    });
    return usuario

};

//======================
//Verifica admin role
//======================
let verificaAdmin = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: true,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
}

//======================
//Verifica token url
//======================
let verificaTokenUrl = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario
        next();

    });

}



module.exports = {
    verificaToken,
    verificaAdmin,
    verificaTokenUrl
}