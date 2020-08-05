const mongoose = require('mongoose')

const Schema = mongoose.Schema

const receitaSchema = new Schema({

    evento:{
        type: Schema.Types.ObjectId,
        ref: 'Evento'
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Receita', receitaSchema )