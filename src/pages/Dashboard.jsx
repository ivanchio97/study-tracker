import React, {useEffect, useState} from 'react'
import {db} from '../firebase'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import ModalAsignatura from '../components/ModalAsignatura'
import ProgressBar from '../components/ProgressBar'
import '../styles/Dashboard.css'

const Dashboard = () =>{

  const navigate = useNavigate();
  const {user, loading, logout} = useAuth();
  const [asignaturas, setAsignaturas] = useState([])
  const [show,setShow] = useState(false)
  //Traer datos de firestore
  useEffect(()=>{

    if (!user) return;
    console.log(user)
    const q = query(collection(db,'asignaturas'), where("usuarioId","==",user.uid))
    const unsuscribe = onSnapshot(q, (querySnapshot)=>{
      const asignaturasArray = querySnapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      }));
      setAsignaturas(asignaturasArray)
    })
    return () => unsuscribe();
  },[user])
  //Cerrar sesión
  const handleLogout = async () =>{
    await logout();
    navigate('/')
  }
  //Añadir asignatura
  const handleAdd = async (texto) =>{
    try{
      if (!user) return;

      await addDoc(collection(db, "asignaturas"),{
        nombre: texto,
        progreso: 0,
        subtemas: [
          
        ],
        usuarioId: user.uid
      })
      setShow(false)
    } catch(error){
      console.log(error)
    }
  }
  //abrir asigantura
  const handleClick = (ref) =>{
    navigate(`/dashboard/${ref}`)
  }
  //eliminar asignatura
  const handleDelete = async (id) =>{
    if( confirm("¿Eliminar la asignatura?") ) {
      
      try{
        const ref = doc(db, 'asignaturas', id)
        await deleteDoc(ref)
      }catch(error){
        console.log(error)
      }
    }  
  }

  return(
    <div className='dashboard'>
      { show && <ModalAsignatura show={show} setShow = {setShow} handleAdd = {handleAdd} />}
      <button className='btn btn-primary' onClick={()=>setShow(true)}>Agregar asignatura</button>
      <div className='dashboard-list'>
        {
          asignaturas.map((elemento)=>{
            return (
              <div className='dashboard-item' onClick={()=>handleClick(elemento.id)} >
                <div className='dashboard-item-info'>
                  <h4>{elemento.nombre}</h4>
                  <button onClick = {(e)=> {e.stopPropagation(); handleDelete(elemento.id)} } ><i className='bi bi-trash3'></i></button>
                </div>
                <ProgressBar value={elemento.progreso} />
              </div>
            )
          })
        }
      </div>
      <button onClick={handleLogout} className='btn btn-dark' >Cerrar sesión</button>
    </div>
  )
}
export default Dashboard