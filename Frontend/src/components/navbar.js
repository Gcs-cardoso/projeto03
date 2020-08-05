import React from 'react'
import {NavLink} from 'react-router-dom'
import AuthContext from '../context/auth-context'
import '../Style/navbar.scss'
import {ReactComponent as Logo} from './Logo.svg'

export default function navbar(props) {
    return(
    <AuthContext.Consumer>
        {
        function(context){
        return(
          <header>
            <nav className="navigation">
            <div className="logobox"><Logo/></div>
                <ul>
                    <li><NavLink to="/eventos"><button>Eventos</button> </NavLink></li>
                {context.token &&
                    <li><NavLink to="/receitas"><button>Receitas</button></NavLink></li>
                    }
                </ul>
                {!context.token && 
                    <button className="logbtn"><NavLink className='logNavLink' to="/auth">Login</NavLink></button>
                }{context.token && 
                    <button className="outbtn" onClick={()=>{context.logout()}}>Log out</button>
                }
            </nav>
        </header>  
        )
        }
    }
    </AuthContext.Consumer>
)}