import { Link, useLocation } from "react-router-dom"
import BackArrow from "./BackArrow"


const NavBar = () =>{

const location = useLocation()
const home = location.pathname === '/';

  return(
    <div className='nav-bar'>
      { !home && <BackArrow />}
      <Link to='/'><button>LOGO</button></Link>
    </div>
  )
}
export default NavBar