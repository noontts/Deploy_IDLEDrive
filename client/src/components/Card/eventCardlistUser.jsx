import React from 'react'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../../service/baseURL'
export default function EventListCard({ event }) {
  
    const imgURL = `${BASE_URL}/api/v1/idledrive/images`;
    const navigate = useNavigate();
  
    return (
    <>
            <div className="card w-72 bg-base-100 shadow-xl mt-10">
        <figure><img src={`${imgURL}/${event.EventImages[0].imageURL}`} alt="view" /></figure>
        <div className="card-body">
            <h2 className="card-title text-2xl font-semibold">{event.eventName}</h2>

            <div className='flex'>
                <p className='text-sm font-semibold'>{event.eventDate}
                    <span className='text-sm font-semibold ml-2'>{event.eventTime}</span>
                    <span className='text-sm font-semibold'> น.</span>
                </p>
            </div>

            <div className='Location flex mt-5 mb-3'>
                <div className='text-xl'>🗺️</div>
                <p className='font-medium pt-1 text-sm'>{event.locationName}</p>

            </div>

            <div className="card-actions justify-center">
                <button className="btn btn-primary bg-blue-800 text-white w-40 h-7 rounded-3xl font-bold text-xl duration-300
               hover:bg-sky-500 hover:cursor-pointer hover:duration-300
                "
                onClick={()=>navigate(`/event/${event.id}`)}
                >เพิ่มเติม</button>
            </div>
        </div>
        </div>
    </>
  )
}
