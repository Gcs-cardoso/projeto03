import React,{} from 'react'

export default React.createContext({
    token:null,
    idUsuario:null,
    login: (token,TokenExpiration,idUsuario)=>{},
    logout: () =>{}
})