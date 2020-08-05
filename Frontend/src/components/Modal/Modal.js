import React from 'react'
import './Modal.scss'

const Modal = props =>{
return(
    <div className="modal">
        <header className="titulo">{props.title}</header>
        <section className = "section">
            {props.children}
        </section>
        <section className = "acoes">
             {props.canBookmark&&<button className="btn" id="Favoritar" onClick={props.onBookmark}>onBookmark</button>}
             {props.canCancel&& <button className="btn" id="Cancel" onClick={props.onCancel}>Cancelar</button>}
             {props.canConfirm&& <button className="btn" id="Confirm" onClick={props.onConfirm}>Criar</button>}
        </section>
    </div>)
}
export default Modal