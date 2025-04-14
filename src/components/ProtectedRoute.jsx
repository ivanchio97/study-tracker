import {Navigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

const ProtectedRoute = ({children}) =>{
  const {user, loading} = useAuth();

  if (loading) return <div class="text-center"><div class="spinner-border" role="status"></div></div>
  return user ? children : <Navigate to='/login' />

}

export default ProtectedRoute