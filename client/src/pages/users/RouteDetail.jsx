import React, { useEffect, useState } from "react";
import ImageDetailShow from "../../components/ImageDetail";
import SanitizeHTML from "../../components/SanitizeHTML";
import Mapbutton from "../../components/Mapbutton";
import { getDetailRoutes } from "../../service/route";
import { useParams } from "react-router-dom";

const RouteDetail = () => {
  const { id } = useParams();
  const [routeDetail, setRouteDetail] = useState();
  
  useEffect(()=>{
    const fetchDetailRoute = async()=>{
      const res = await getDetailRoutes(id);
      console.log(res);
      setRouteDetail(res);
    }

    fetchDetailRoute();

  },[id])


  return (
    <>
    {routeDetail ? (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-3xl font-bold mb-10 mt-10 text-primary">
          {routeDetail.name}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-2/4">
            <ImageDetailShow imgList={routeDetail.RoutesImages} />
          </div>

          <div className="w-2/4 mt-10 p-6 flex flex-col justify-center items-center">
            <div>
              <div className="text-lg text-primary text-center font-bold">
                เกี่ยวกับเส้นทาง
              </div>
              <ul className="list-disc mt-6">
                <li>ระยะเวลา : {routeDetail.time} days</li>
                <li>ระยะทาง : ~ {routeDetail.length} kilometres</li>
                <li>ค่าใช้จ่าย : ~ {routeDetail.price} บาท (แล้วแต่บุคคล)</li>
              </ul>
            </div>

            <p className="text-center mt-10 whitespace-pre-line">
              {routeDetail.content}
            </p>
          </div>
        </div>

        <div className="text-3xl text-primary font-bold mt-10">Google Map</div>
        <SanitizeHTML
          html={routeDetail.embedLink}
        />
        <Mapbutton href={routeDetail.link} />
      </div>
    ):
    ( 
      <div className="w-full h-full flex items-center justify-center">
          <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    )
    }
      
    </>
  );
};

export default RouteDetail;
