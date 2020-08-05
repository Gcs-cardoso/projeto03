const Evento = require('../../models/evento')
const Usuario = require('../../models/usuario')
const {usuario} = require('./merge')




module.exports ={

    eventos: async ()=>{
        try{
            const eventos = await Evento.find()
            return eventos.map(evento =>{
                return {...evento._doc,
                    criador: usuario.bind(this,evento._doc.criador)
                    }
            })
            }catch(err){throw err}
        },
        criarEvento: async (args,req) =>{
            //Auth jwt
            if(!req.isAuth){
                throw new Error('Não Autorizado')
            }
            const evento = new Evento({
                nome:   args.eventoinput.nome,
                descricao:  args.eventoinput.descricao,
                criador:req.idUsuario
            })
    
            let eventoCriado
            
          try{ 
            const result = await evento
            .save()
           
                eventoCriado = {... result._doc, criador: usuario.bind(this,result._doc.criador)}
                const setUsuario = await Usuario.findById(req.idUsuario)
    
                    if(!setUsuario){ throw new Error("Usuario invalido")}
                    { 
                    setUsuario.receitasCriadas.push(evento)
                    await setUsuario.save()
                    }
            
                    return eventoCriado
          }catch(err){throw err}
        }
        
    } 