import React,{useState ,useContext} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import PaginaAuth from './Paginas/Auth'
import PaginaEventos from './Paginas/Eventos'
import PaginaReceita from './Paginas/Receitas'
import Navbar from './components/navbar'
import AuthContext from './context/auth-context'
import './Style/App.scss'

function App() {

  const Context = useContext(AuthContext)
  const [token, setToken] = useState(Context.token)
  const [idUsuario, setidUsuario] = useState((Context.idUsuario))

  function login (token,idUsuario,tokenExpiration){
    setToken(token)
    setidUsuario(idUsuario)
  }
  function logout (){
    setToken(null)
    setidUsuario(null)
  }
  return (
  <div className="background">
    <BrowserRouter>
    <AuthContext.Provider value={{token:token, idUsuario: idUsuario , login: login, logout:logout}}>
    <Navbar/>
     <div className="spa">
       
      <Switch>
      {!token&& <Redirect from="/" to="/auth" exact />}
      {!token&& <Redirect from="/receitas" to="/auth" exact />}
      {!token&& <Route path="/auth" component={PaginaAuth}/>}
      {token&& <Redirect from="/" to="/eventos" exact></Redirect>}
      {token&& <Redirect from="/auth" to="/eventos" exact></Redirect>}
      <Route path="/eventos" component={PaginaEventos}/>
      {token && <Route path="/receitas" component={PaginaReceita}/>}
      </Switch>
      
    </div>
    </AuthContext.Provider>
    </BrowserRouter>
  </div>
  );
}

export default App;
