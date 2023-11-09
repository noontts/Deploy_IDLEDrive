import React from 'react'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../../service/baseURL';

const RouteCardList = ({ route }) => {
  const navigate = useNavigate();
  const imageURL = `${BASE_URL}/api/v1/idledrive/images/`
  return (
    <>
        <div className='container w-64 shadow-lg rounded-md mt-3 mr-6
        hover:cursor-pointer hover:shadow-xl'
        onClick={()=>navigate(`/route/${route.id}`)}>
            <div> 
                <img src={`${imageURL}${route.RoutesImages[0].imageURL}`}></img>
            </div>
            <div className='flex flex-col p-4'>
                <span className='text-primary font-bold text-lg'>{route.name}</span>
                <span className='text-sm font-bold'>ระยะเวลา : {route.time} วัน</span>
                <span className='text-sm font-bold'>ระยะทาง : ~{route.length} KM</span>
            </div>
        </div>
    </>
  )
}

export default RouteCardList