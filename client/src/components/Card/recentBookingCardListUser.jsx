import React, { useEffect, useState } from 'react'
import { getDetailCar } from '../../service/cars';
import {getDetailCarRental} from '../../service/cars_rental';
import BASE_URL from '../../service/baseURL'

export default function RecentCard({ bookingData }) {
    const [car, setCar] = useState();


    useEffect(()=>{
        const fetchCarData = async() =>{
            const res = await getDetailCar(bookingData.car_idcar);
            console.log('Car',res);
            setCar(res);
        }
        fetchCarData();

    },[bookingData.RentalID])

  return (
    <>
    {car &&
    <div className="card w-80 bg-base-100 shadow-xl mr-5">
          <div className="card-body">
            <h2 className="card-title uppercase font-bold">เลขที่รายการ : 
                <div className='text-xl font-bold text-blue-700'>#{bookingData.RentalID}</div>
            </h2>

            <div className='flex justify-between mt-3'>
                <img className='w-32 h-28 object-cover bg-center rounded-xl' src={`${BASE_URL}/api/v1/idledrive/images/${car.listImage[0].imageURL}`} alt='motorhome' />
                
                <div className='flex-col ml-2'>
                    <p className='font-bold text-xl line-clamp-1'>{car.car.make} {car.car.model}</p>
                    <p className='font-bold text-sm'>{car.car.plate}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary mt-3 w-full h-6 bg-blue-800 text-white duration-300
                        hover:bg-sky-500 hover:cursor-pointer hover:duration-300
                        ">{bookingData.RentalStatus}</button>
                    </div>
                </div>
            </div>
            <div className='w-full border-b my-1.5'/>
            <div className='flex justify-start'>
                <div className='flex'>
                    <img className='h-12 w-12 rounded mr-2 ' src={`${BASE_URL}/api/v1/idledrive/images/${car.rental.rentalDetail.profileURL}`} alt='idle'/>
                    
                    <div className='flex-col'>
                        <p className='text-sm font-bold text-black'>{car.rental.rentalDetail.rental_name}</p>
                        <div className='text-sm font-bold'>⭐ 
                            <span className='text-sm text-gray-700 font-bold text-right mx-1'>{car.rental.rentalReview.averageRating}</span>
                            <span className='font-semibold text-gray-500'>( {car.rental.rentalReview.reviewCountSum} รีวิว )</span>
                        </div>
                    </div>
                </div> 
            </div>
          </div>
        </div>}
        
    </>
  )
}
