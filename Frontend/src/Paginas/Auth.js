import React,{useState,useContext, createRef} from 'react'

import AuthContext from '../context/auth-context'

import '../Style/Auth.scss'

function PaginaAuth() {

    const [isLogin, setIsLogin] = useState(true)

    const Context = useContext(AuthContext)

    const emailEl = createRef()
    const passwordEl = createRef()

    function loginHandler() {
        setIsLogin(!isLogin)
    }

//Login

    function submitHandler(event) {
        event.preventDefault()
        const email = emailEl.current.value
        const password = passwordEl.current.value

        if(email.toString() === 0 || password.toString === 0){
            return
        }


    let requestBody = {
        query:
        `query{
            login(email:"${email}",password:"${password}"){
                idUsuario
                token
                TokenExpiration}
            }
        `
        
    }

        if (!isLogin) {
            requestBody={
                query:`
                mutation{
                    criarUsuario(usuarioinput: {
                        email:"${email}",
                        password:"${password}"
                    }){
                        _id
                        email
                    }
                }
                `
            }
        }
        fetch('http://localhost:9000/graphql',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            if(res.status !== 200 && res.status  !== 201){
                throw new Error('Falha')
            }
            return res.json()
         } 
        ).then(resData =>{
            if(resData.data.login.token){
                Context.login(resData.data.login.token, resData.data.login.idUsuario, resData.data.login.TokenExpiration)
             }
        }).catch(err =>{
            console.log (err)})
    }
    return(

    <form className ="authform" onSubmit={(e) =>{submitHandler(e)}}>

    <div className="authctrl">
       <label htmlFor="email" >E-Mail</label>
       <input type="email" id="email" placeholder=" exemplo@exemplo.com" ref={emailEl}/>
    </div>
    <div className="authctrl">
       <label htmlFor="password" >Senha</label>
       <input type="password" id="password" placeholder="Insira a sua senha" ref={passwordEl}/>
    </div>
    <div className="authact">
       <button className='btnsub' type="submit">Submit</button>
       <h5>Mudar Para :</h5>
       <button className='btnsw'type="button" onClick={() =>{loginHandler()}}>{isLogin? 'Cria Conta':'Login'}</button>
    </div>

    </form>
    )

}
export default PaginaAuth