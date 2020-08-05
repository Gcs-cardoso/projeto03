import React, {useState,useRef,useContext,useEffect} from 'react'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Modal/backdrop'
import AuthContext from '../context/auth-context'
import  '../Style/Eventos.scss'

 export default function PaginaEventos(){

const [newReceita,setNewReceita] = useState(false)
const [AllRecipes, setallrecipes] = useState([])
const [Focus,setFocus] = useState(null)
const [FocusedEvent,setFocusedEvent]= useState(null)


const authContext = useContext(AuthContext)
const refNome = useRef()
const refDesc = useRef()

useEffect(() => {
    fetchRecipes()
})

//GERA MENU DE CRIAÇÂO ITEM

function newRecipeHandler(){
    setNewReceita(!newReceita)
}

//CRIAR ITEM

function ConfirmRecipeHandler() {
    
    if(refNome.current.toString===''||refDesc.current.toString===''){return}

        newRecipeHandler()
const requestBody = {
    query:
         `mutation {
            criarEvento(eventoinput: {nome: "${refNome.current.value}", descricao: "${refDesc.current.value}"}) {
              _id
              nome
              descricao
            }
          }
         `
    
    }
    
    const token = authContext.token

       fetch('http://localhost:9000/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
         }).then(res=>{
            if(res.status !== 200 && res.status  !== 201){
                throw new Error('Falha')
            }
            return res.json()
         } 
        ).then(resData =>{
        }).catch(err =>{console.log(err)})

    newRecipeHandler()
}

//LISTAR ITENS

function fetchRecipes(){
    const requestBody={
        query:
        `query{eventos{
            _id
            nome
            descricao
            criador{
                _id
                email
            }
        }}`
    }
    fetch('http://localhost:9000/graphql',{
        method:'POST',
        body: JSON.stringify(requestBody),
        headers:{'Content-Type':'application/json'}
    }).then(res=>{
        if(res.status !== 200 && res.status !== 201){
            throw new Error ('Falha')
        }
        return res.json()
    }).then(resData=>{
        const eventos = resData.data.eventos
        setallrecipes(eventos)
    }).catch(err=>{
        console.log(err)}
        )
    
}

    const Dono = authContext.idUsuario
    const listaReceitas = AllRecipes.map(evento =>{
    return(
        
    <li key={evento._id} className="listItem" onClick={()=>{HandleFocus(evento._id)}}>

        
        <div className="itembox">
            <div className="divtitlebox">{evento.nome}</div>
            <div className="divDescriptionBox">{evento.descricao}</div>
            <div className="divInfobox"> 
               {Dono === evento.criador._id && "Sua Receita!" }
               
            </div>
        </div>
    </li>)
    })


//FOCAR ITEM

function HandleFocus(id) {
    const item =AllRecipes.find(item => item._id === id);

    setFocusedEvent(item)
    setFocus(true)

}

    return(  

        <div className="page">


    {Focus && <Backdrop/> }           
        {Focus && authContext.token && 
            //loged Focus

        <Modal title={FocusedEvent.nome}  canCancel onCancel={()=>{setFocus(false)}}>
            <div>{FocusedEvent.descricao}</div> </Modal> }
        
    
            {Focus && !authContext.token &&
            //unloged Focus
            <Modal title={FocusedEvent.nome} canCancel onCancel={()=>{setFocus(false)}}>&rbrace;<div>{FocusedEvent.descricao}</div> </Modal> }
       
        {newReceita && <Backdrop/>}
        {newReceita&& <Modal title="Criar Receita" canCancel canConfirm onCancel={()=>{newRecipeHandler()}} onConfirm={()=>{ConfirmRecipeHandler()}}>
                <form>
                    <div>
                    <div className="name">  
                        <label htmlFor="nome" className="lblNome" >Nome</label>
                        <input type="text" className="inputNome" ref={refNome}/>
                    </div>
                    <div className="desciption">
                        <label htmlFor="descricao" className="lblDesc">Descrição</label>
                        <textarea htmlFor="descricao" className="txtDesc" rows="10" ref={refDesc}/>
                    </div>
                    </div>
                </form>
            </Modal>}
        {authContext.token && <div className="event">
                 <button className="createEvent" onClick={()=>{newRecipeHandler()}}>
                     Criar Receita
                 </button>
            </div>}
            
        <section className="AllRecipes">
                <ul className="ulistItems">
                    {listaReceitas}
                </ul>
            </section>
             
        </div>
                
    )
}
