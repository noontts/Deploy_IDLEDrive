import React from 'react'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../service/baseURL';

export default function Transaction_BackOff({ rentData }) {
    const navigate = useNavigate();
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return format(date, "hh:mm a");
      };

  return (
      <>
        <div 
        onClick={()=> navigate(`/merchant/tracking/${rentData.rental.RentalID}`)}
        className='my-3 w-full h-36 px-10 py-5 shadow-md flex justify-between rounded-xl border-[#D9D9D9] border-2
        hover:cursor-pointer hover:shadow-xl hover:border-blue-700'> 
            <div className='flex items-center'>
                <img className='h-24 w-24 rounded-full object-cover' src={`${BASE_URL}/api/v1/idledrive/images/${rentData.car.CarImages[0].imageURL}`} alt='carPic'/>
                <div className='flex flex-col justify-center ml-5'>
                    <div className='text-xl font-bold'>{rentData.car.plate}</div>
                    <div className='text-base font-semibold'>{rentData.car.model} {rentData.car.make}</div>
                    <div className='text-base font-bold text-blue-700'>{rentData.rental.RentalStatus}</div>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className='text-blue-700 text-2xl font-bold'>{rentData.rental.TotalCost}<span> ฿</span></div>
                <div className='font-semibold'>{rentData.rental.RentalStartDate}<span> | </span><span>{formatDateTime(rentData.rental.updatedAt)}</span></div>
            </div>

        </div>
      </>
  )
}
