import React from 'react'
import backgroundImageUrl from "../../images/bgcar.gif";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
      };

    const containerStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover', 
        backgroundPositionY: `center`,
      };


  return (

    <>
        <div className='w-11/12 mx-auto my-10 p-10 py-20 bg-white text-center rounded-2xl shadow-lg border-2 border-[#D9D9D9]' style={containerStyle}>
            <div className='text-3xl font-bold text-blue-700 mb-5'>- เกิดข้อผิดพลาด -</div>
            <div className='text-9xl font-bold text-blue-700'>4<span className=''>0</span>4</div>
            <p className='uppercase text-4xl font-semibold text-blue-700'>page <span className='text-red-500 underline'>not</span> found</p>
            <button className='btn btn-primary text-white mt-16 drop-shadow-lg' onClick={goToHomePage}>กลับไปสู่หน้า Homepage</button>
        </div>
    </>
  )
}
