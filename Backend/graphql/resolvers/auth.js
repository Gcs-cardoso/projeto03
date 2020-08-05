
const Usuario = require('../../models/usuario')
const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')





module.exports = {

    criarUsuario: async args =>{

      try{  
      const CheckUsuario = await Usuario.findOne({
      email: args.usuarioinput.email
      })
                
        if(CheckUsuario){ throw new Error("E-mail ja cadastrado...")}

        const hashPassword = await bcript.hash(args.usuarioinput.password, 12)
        const usuario = new Usuario({
         email: args.usuarioinput.email,
         password: hashPassword
        })
        const result = await usuario.save()
        return {...result._doc, password:null}
      }catch(err){throw err}
    },

      login: async ({email,password}) => {
        const usuario = await Usuario.findOne({email: email})
        if(!usuario){
          throw new Error (" Email Invalido")
        }
        const CheckPass = await bcript.compare(password,usuario.password)
        if(!CheckPass){
          throw new Error(" Senha Invalida")
        }

        const token = await jwt.sign(
          {idUsuario: usuario.id, email: usuario.email},
          'secretkey',
          {expiresIn:"1h"}
          )

        return {idUsuario: usuario.id, token: token, TokenExpiration:1}
      }
}