const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let salaSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    admins: [{
        type: String
    }],
    miembros: [{
        type: String
    }]
});


module.exports = mongoose.model('Sala', salaSchema);