import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../service/context/AuthContext';

export default function AddRouteBtn() {
  const { user } = useContext(AuthContext);
const navigate = useNavigate();


function addRoute(){
  if(user !== null){
    navigate('/addroute')
  }else{
    navigate('/login')
  }
    
}

  return (
    <>
        <button className='btn btn-primary text-white' onClick={addRoute}>+ เพิ่มเส้นทางของคุณ !</button>
    </>
  )
}
