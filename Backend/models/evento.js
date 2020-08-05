const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventoSchema = new Schema({

    nome: {
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    criador:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

})

module.exports = mongoose.model('Evento', eventoSchema)