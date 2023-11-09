import React,{useState} from "react";
import Idle from '../../components/MyCarStatus/idle'
import Activate from '../../components/MyCarStatus/activate'
import { useNavigate } from "react-router-dom";
import BASE_URL from '../../service/baseURL'

export default function Back_myCarList({ data, carData }) {

    const status = data;
    const navigate = useNavigate();

    function showStatus(status){
        if(status === false){
            return <Idle/>
        }
        else if(status === true){
            return <Activate/>
        }
    }

  return (
    <>
      <div className="w-3/4 flex flex-col mx-auto my-10
      hover:cursor-pointer hover:shadow-xl"
      onClick={()=>navigate(`/merchant/editcar/${carData.car_id}`)}>
        <div className="card lg:card-side bg-base-100 shadow-lg drop-shadow-lg h-52 border-[#D9D9D9] border-2 hover:border-blue-700 rounded-lg">
          <figure className="w-1/3">
            <img
            className="h-52"
              src={`${BASE_URL}/api/v1/idledrive/images/${carData.CarImages[0].imageURL}`}
              alt="Album"
            />
          </figure>
          <div className="card-body w-full h-52 flex flex-row">
            <div className="w-3/4">
                <h1 className="card-title w-11/12 font-bold text-2xl">{carData.make} {carData.model}</h1>
                <p className="w-11/12 text-lg font-semibold">{carData.plate}</p>
                <p className="w-11/12 font-semibold text-[#908D8D] line-clamp-3">{carData.description}</p>
            </div>
        
            {showStatus(carData.status)}
  
          </div>
        </div>
      </div>
    </>
  );
}
