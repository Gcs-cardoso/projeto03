import React,{useState,useEffect,useContext} from 'react'
import '../Style/Receitas.scss'
import AuthContext from '../context/auth-context'

export default function PaginaReceitas() {


const [myRecipes,setmyRecipes]=useState()
const authContext = useContext(AuthContext)
const token = authContext.token
const user = authContext.idUsuario    
    
    useEffect(() => {
        GetReceitas()
    },[])


function GetReceitas(){

    const requestBody={
        query:
        `query{eventos{criador{
            _id
            receitasCriadas{_id
                nome
                descricao
            }}}}
            
            `
        }
        fetch('http://localhost:9000/graphql',{
            method:'POST',
            body: JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res=>{
            if(res.status !== 200 && res.status !== 201){
                throw new Error ('Falha')
            }
            return res.json()
        }).then(resData=>{
            
            const eventos = resData.data.eventos
            const criadores = eventos.map(evento => evento.criador)

            const criador = criadores.find(creator => creator._id === user)
           
            const lista = criador.receitasCriadas.map(evento=>{
                
            return( 
                <li className= "listItem">
                <div className="itembox">
                    <div className="divtitlebox">{evento.nome}</div>
                    <div className="gi">{evento.descricao}</div>
                    
                </div>
                </li>
            )})
        setmyRecipes(lista)

            }).catch(err =>{console.log(err);})
    }

    

    return(

<div className="page" >
            
            <section className="AllRecipes">
                <ul className="ulistItems">
                    {myRecipes}
                </ul>
            </section>
       </div>      
     

    )



}