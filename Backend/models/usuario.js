const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usuarioSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
     receitasCriadas:[
         {
             type:Schema.Types.ObjectId,
             ref:'Evento'
         }
     ]
})

module.exports = mongoose.model('Usuario', usuarioSchema)