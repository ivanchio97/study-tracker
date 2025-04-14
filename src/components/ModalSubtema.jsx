import React, {useState} from 'react'
import '../styles/Modal.css'
const ModalSubtema = ({show, setShow, handleAdd}) =>{

  const [name, setName] = useState("")


  return(
    <div className='modal-container' onClick={()=>setShow(false)} >
      <div className='modal-window' onClick = {(e)=> e.stopPropagation() } >
        <h3>Nuevo subtema</h3>
        <input type="text" placeholder='Nombre del subtema' onChange = {(e)=>setName(e.target.value)} value={name} />
        <button className='btn btn-primary' onClick={()=>{handleAdd(name)}} >Agregar</button>
      </div>
    </div>
  )
}
export default ModalSubtema