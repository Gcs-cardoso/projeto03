
const Evento = require('../../models/evento')
const Usuario = require('../../models/usuario')


const eventos = async idEventos =>{

    try{
       const eventos = await Evento.find({_id: {$in: idEventos}})
       return eventos.map(evento =>{
 
         return {
             ...evento._doc, 
             criador: usuario.bind(this,evento.criador)
         }
 
       })
    }
    catch(err){throw err }
 }
 
 const eventoUnico = async idEvento =>{
     try {
         const evento = await Evento.findById(idEvento)
         return{...evento._doc,criador: usuario.bind(this,evento.criador)}
     } catch (err) {throw err}
 }
 
 const usuario = async idUsuario => {
     
     try{
       const usuario = await Usuario.findById(idUsuario)
       return{
             ...usuario._doc,
             receitasCriadas: eventos.bind(this,usuario._doc.receitasCriadas)
       }
     }catch(err){throw err}
 }
 
 
exports.eventos = eventos
exports.eventoUnico = eventoUnico
exports.usuario = usuario