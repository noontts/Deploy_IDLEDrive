import React, { useEffect, useState } from 'react'
import EventListCard from '../../components/Card/eventCardlistUser'
import { getAllEvents } from '../../service/event'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function EventList() {

    const [listEvents, setListEvents] = useState();

    useEffect(()=>{
        const fetchAllEvents = async()=>{
            const res = await getAllEvents();
            setListEvents(res);
            console.log(res);
        }
        fetchAllEvents();
    },[])
    
  return (
    <>
        <div className='text-3xl text-blue-700 font-bold text-center m-10'>Event</div>

    <div className='w-1/2 flex mx-auto '>
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper h-60 w-9/12 bg-slate-400 rounded-lg"
          >
            <SwiperSlide><img src='https://i.ytimg.com/vi/qRFKuj7rwXo/maxresdefault.jpg' className='object-cover object-center w-full h-full' alt=''/></SwiperSlide>
            <SwiperSlide><img src='https://www.national.ca/workspace/uploads/editorial/tnb-case-study-header-en-1678902540.jpg' className='' alt=''/></SwiperSlide>
            <SwiperSlide><img src='https://marketplacer.imgix.net/NV/iwGt3W3GioZzdrlx9fpEE4QBo.png?auto=format&fm=png&fit=max&lossless=true&w=1080&h=1080&s=76159c7cc6b5c1eda60338d11ac2cdd2' className='object-cover object-center w-full h-full' alt=''/></SwiperSlide>
            <SwiperSlide><img src='https://imgscf.slidemembers.com/docs/1/1/318/camping_powerpoint_presentation_templates_317418.jpg' className='object-cover object-center w-full h-full' alt=''/></SwiperSlide>
            <SwiperSlide><img src='https://media.insider.in/image/upload/c_crop,g_custom/v1519137559/a53y0csfzrmkdgjwttu9.jpg' className='object-cover object-top w-full h-full' alt=''/></SwiperSlide>
          </Swiper> 
    </div>

        <div className='flex flex-wrap mx-auto w-10/12 gap-5'>
        {listEvents ? (
              listEvents.map((event,index)=>(
                <EventListCard event={event} key={index} />
              ))
            ) : (
              <span className="loading loading-ring loading-lg text-primary"></span>
            )}
        </div>


    </>
  )
}
