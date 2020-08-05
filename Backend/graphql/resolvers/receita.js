const Evento = require('../../models/evento')
const Receita = require('../../models/receita')
const {usuario,eventoUnico} = require('./merge')

module.exports = {

    receitas: async(args,req)=>{

        //Auth jwt
        if(!req.isAuth){
            throw new Error('Não Autorizado')
        }
        
        try {
          const receitas = await Receita.find()
          return receitas.map(receita => {

            return{...receita._doc,
             evento: eventoUnico.bind(this,receita._doc.evento),
             usuario: usuario.bind(this,receita._doc.usuario)}
            })

        } catch (err) {throw err}
    },

    setReceita: async (args,req)=>{

        //Auth jwt
        if(!req.isAuth){
            throw new Error('Não Autorizado')
        }

        try {
          const getEvento = await Evento.findOne({_id: args.idEvento})
          const receita = new Receita({
              evento: getEvento,
              usuario: req.idUsuario
          })
          const result = await receita.save()
          return {...result._doc,
            evento:eventoUnico.bind(this,receita._doc.evento),
            usuario: usuario.bind(this,receita._doc.usuario)
            }
        } catch (err) {throw err}
    },
    popReceita: async (args,req) =>{

        //Auth jwt
        if(!req.isAuth){
            throw new Error('Não Autorizado')
        }

        try {
           const popEvent = await Receita.findById(args.idReceita).populate("evento")
           const popValue = {
               ...popEvent.evento._doc,
               criador: usuario.bind(this,popEvent.evento._doc.criador)
           }
           await Receita.findByIdAndDelete(args.idReceita)
           return popValue

        } catch (err) {throw err}
    }
}