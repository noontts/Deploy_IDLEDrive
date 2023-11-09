import React from 'react'
import { useNavigate } from 'react-router-dom'
import BASE_URL from '../../service/baseURL'

export default function CarlistCard({ carData, queryParams }) {
    const { pickup_date, return_date, location_input } = queryParams;
    const { car_id, model, make, rentalRate, description, CarImages, CarRental, reviews } = carData;
    const ratingAvgFloat = parseFloat(reviews.averageRating);
    const navigate = useNavigate();

  return (
    <>
        <div className="card w-[350px] bg-base-100 shadow-lg mt-5 z-0
        hover:cursor-pointer hover:shadow-xl"
        onClick={()=>navigate(`/motorhome/${car_id}?pick-up=${pickup_date}&return=${return_date}&location=${location_input}`)}>
            <figure><img className='h-[255px]' src={`${BASE_URL}/api/v1/idledrive/images/${CarImages[0].imageURL}`} alt="Car"/></figure>
            <div className="card-body">
                <h2 className="card-title text-2xl font-semibold">{`${make} ${model}`}</h2>
                <p className='text-gray-400 line-clamp-1'>{description}</p>

                <div className='flex justify-between mt-5'>
                    <div className='text-left flex items-center'>
                        <img className='h-6 w-6 rounded mr-2 ' src={`${BASE_URL}/api/v1/idledrive/images/${CarRental.profileURL}`} alt='idle'/>
                        <span className='text-sm font-bold text-gray-400'>{CarRental.rental_name}</span>
                    </div>
    
                    <div className='text-sm font-bold text-right'>⭐ 
                        <span className='text-sm text-gray-700 font-bold text-right mx-1'>{ratingAvgFloat.toFixed(2)}</span>
                        <span className='font-semibold text-gray-500'>({reviews.ratingCount} รีวิว )</span>
                    </div>
                </div>
                <div className='w-full border-b my-1.5'></div>
                <div className="card-actions justify-end">
                    <p className="text-2xl font-bold text-right">{rentalRate}
                        <span className="text-2xl text-gray-500 font-bold text-right"> ฿</span>
                        <span className='text-xs font-bold text-gray-500 pt-3'>/วัน</span>
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}
