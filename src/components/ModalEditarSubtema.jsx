import React, {useState} from 'react'
import '../styles/Modal.css'
const ModalEditarSubtema = ({showEdit, setShowEdit, handleEdit, name, setName}) =>{


  return(
    <div className='modal-container' onClick={()=>setShowEdit(false)} >
      <div className='modal-window' onClick = {(e)=> e.stopPropagation() } >
        <h3>Editar subtema</h3>
        <input type="text" placeholder='Nombre del subtema' onChange = {(e)=>setName(e.target.value)} value={name} />
        <button className='btn btn-primary' onClick={()=>{handleEdit()}} >Agregar</button>
      </div>
    </div>
  )
}
export default ModalEditarSubtema