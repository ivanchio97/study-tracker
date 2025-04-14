import React, { useState } from 'react'
import '../styles/Home.css'
import {Link, useNavigate} from 'react-router-dom'
import {app} from '../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth(app)

const Login = () =>{

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const login = async () => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth,email,password)

      if(userCredential.user){
        navigate('/dashbpard')
      }

    } catch(error){
      alert(error.message)
    }
  }


  return(
    <div className='login flex-column'>
      <h3>Iniciar sesión</h3>
      <input type="text" required placeholder='Correo electrónico' onChange={(e)=>setEmail(e.target.value)} value={email} />
      <input type="password" required placeholder='Contraseña' onChange={(e)=>{setPassword(e.target.value)}} value={password} />
      <button onClick={login} className='btn btn-primary' >Iniciar sesión</button>
      <button className='btn btn-light' >Iniciar sesión con Google</button>
      <p>¿Aún no tienes una cuenta? <Link to='/registrer'>Registrate</Link> </p>
    </div>
  )
}
export default Login