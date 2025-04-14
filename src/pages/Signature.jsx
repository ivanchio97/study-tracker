import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ProgressBar from '../components/ProgressBar';
import '../styles/Signature.css'
import ModalSubtema from '../components/ModalSubtema';
import {v4 as uuidv4} from 'uuid'
import ModalEditarSubtema from '../components/ModalEditarSubtema';

const Signature = () =>{

  const {id} = useParams();
  const [asignatura,setAsignatura] = useState(null)
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [name, setName] = useState("")
  const [editIndex, setEditIndex] = useState(0)
  const [progreso, setProgreso] = useState(0)

  //calcular progreso
  
  useEffect(() => {
    if (!asignatura || !Array.isArray(asignatura.subtemas) || asignatura.subtemas.length === 0) return;
  
    const total = asignatura.subtemas.reduce((acc, elem) => {
      if (elem.estado === "Dominado") return acc + 100;
      if (elem.estado === "Intermedio") return acc + 50;
      return acc + 25;
    }, 0);
  
    const promedio = total / asignatura.subtemas.length;
    setProgreso(Math.round(promedio));

    const docRef = doc(db, 'asignaturas', id)
    updateDoc(docRef,{
      progreso: promedio
    })

  }, [asignatura]);
  

  //abrir editor y pasar texto
  const openEdit = (texto,ind) =>{
    setName(texto)
    setShowEdit(true)
    setEditIndex(ind)
  }

  //cambio de estado
  const handleChange = async (e, index) =>{
    const nuevoEstado = e.target.value

    const copy = {
      ...asignatura,
      subtemas: [...asignatura.subtemas]
    }

    copy.subtemas[index].estado = nuevoEstado
    setAsignatura(copy)

    const docRef = doc(db, 'asignaturas', id)
    await updateDoc(docRef, {
      subtemas: copy.subtemas
    })

  }
  //añadir subtema
  const handleAdd = async (texto) =>{
    const copy = {
      ...asignatura,
      subtemas: [...asignatura.subtemas]
    }
    copy.subtemas = [
      ...copy.subtemas,{
        id:uuidv4(),
        estado: "Básico",
        nombre: texto
      }
    ]
    setAsignatura(copy)
    setShow(false)

    const docRef = doc(db, 'asignaturas', id)
    await updateDoc(docRef, {
      subtemas: copy.subtemas
    })

  }
  //eliminar subtema
  const handleDelete = async (el) =>{
    
    const nuevo = asignatura.subtemas.filter((elem) => elem.id !== el.id )
    const copy = {
      ...asignatura,
      subtemas: nuevo
    }
    setAsignatura(copy)

    const docRef = doc(db, 'asignaturas', id)
    await updateDoc(docRef, {
      subtemas: nuevo
    })

  }

  //editar subtema 
  const handleEdit = async (texto, ind) =>{
    const copy = {
      ...asignatura,
        subtemas: [...asignatura.subtemas]
    }
    copy.subtemas[ind].nombre = texto
    setAsignatura(copy)
    setShowEdit(false)

    const docRef = doc(db,'asignaturas',id)
    await updateDoc(docRef,{
      subtemas: copy.subtemas
    })

  }


  //recoger datos según id
  useEffect(()=>{
    const fetchAsignatura = async () =>{
      const docRef = doc(db,'asignaturas', id);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setAsignatura(docSnap.data())
        
      }
    }
    fetchAsignatura()
  },[id])

  //spinner de carga
  if (!asignatura) return <div class="text-center"><div class="spinner-border" role="status"></div></div>

  return(
    <div className='asignatura'>
      {show && <ModalSubtema show={show} setShow = {setShow} handleAdd = {handleAdd} />  }
      {showEdit && <ModalEditarSubtema showEdit={showEdit} setShowEdit = {setShowEdit} handleEdit = {()=>{handleEdit(name, editIndex)}} name={name} setName = {setName} /> }
      <div className='asignatura-header'>
        <h1>{asignatura.nombre}</h1>
        <button className='btn btn-primary add' onClick={()=>setShow(true)} >Agregar</button>
      </div>
      <ProgressBar value={progreso} />
      <div className='asignatura-subtemas'>
      {
        asignatura.subtemas.map((elemento,index)=>{
          return (
            <div className='asignatura-subtemas-item'>
              <div>{elemento.nombre}</div>
              <select value = {elemento.estado} onChange = {(e) => handleChange(e,index)} >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Dominado">Dominado</option>
              </select>
              <div className='item-buttons'>
                <button onClick={()=>openEdit(elemento.nombre, index)} ><i class="bi bi-pencil"></i></button>
                <button onClick={()=>handleDelete(elemento)}><i class="bi bi-trash3"></i></button>
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}
export default Signature