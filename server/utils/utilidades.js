const bcrypt = require('bcrypt');



const crearMensaje = (nombre, mensaje) => {

    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }
}



module.exports = {
    crearMensaje
}