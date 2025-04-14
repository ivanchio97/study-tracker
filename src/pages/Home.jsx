import React from 'react'
import '../styles/Home.css'
import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const Home = () =>{

  const {user, loading} = useAuth();
  
  const beforebuttons = <div className='home-buttons'>
    <Link to='/login' ><button type="button" className="btn btn-primary">Iniciar sesión</button></Link>
    <Link to='/registrer' ><button type="button" class="btn btn-dark" >Registrarse</button></Link>
  </div>;

  const afterbuttons = <div className='home-buttons'> 
  <Link to = '/dashboard'><button className='btn btn-primary' >Dashboard</button></Link>
  </div>
  return(
    <div className='home flex-column'>
      <h1>Study Tracker <strong>v1.0</strong> </h1>
      <h4><em>La nueva forma de organizar tus estudios. </em> </h4>
        {user? afterbuttons: beforebuttons}
    </div>
  )
}
export default Home