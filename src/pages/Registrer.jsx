import React, { useState } from 'react'
import '../styles/Home.css'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { app } from '../firebase'

const auth = getAuth(app)

const Registrer = () =>{

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const crearUsuario = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error al registrar:", error.message);
      alert("Error: " + error.message);
    }
  };


  return(
    <div className='registrer flex-column'>
      <h3>Registrarse</h3>
      <input type="text" required placeholder='Correo electrónico' onChange={(e)=>setEmail(e.target.value)} value={email} />
      <input type="password" required placeholder='Contraseña' onChange={(e)=>{setPassword(e.target.value)}} value={password} />
      <button onClick={crearUsuario} className='btn btn-dark' >Registrarse</button>
      <button className='btn btn-light'>Iniciar sesión con Google</button>
      <p>¿Ya tienes una cuenta? <Link to='/login'>Inicia sesión</Link> </p>
    </div>
  )
}
export default Registrer