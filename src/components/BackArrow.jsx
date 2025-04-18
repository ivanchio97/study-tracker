import {useNavigate} from 'react-router-dom'

const BackArrow = () =>{

  const navigate = useNavigate()

  return(
    <button className='back-arrow' onClick={()=>navigate(-1)}>
      <i class="bi bi-arrow-left-short"></i>
    </button>
  )
}
export default BackArrow