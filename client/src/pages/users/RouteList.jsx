import React, { useEffect, useState } from "react";
import RouteCardList from "../../components/Card/RouteCardList";
import { getAllRoutes } from "../../service/route";
import AddRouteBtn from "../../components/AddRouteBtn";

const RouteList = () => {
  const [routeList, setRouteList] = useState();

  useEffect(() => {
    const fetchAllRoute = async () => {
      const res = await getAllRoutes();
      setRouteList(res);
      console.log(res);
    };

    fetchAllRoute();
  }, []);

  return (
    <>
    <div className="relative mb-10">
      <div className="absolute right-8 top-8">
        <AddRouteBtn/>
      </div>
    </div>

      <h1 className="text-center text-3xl font-bold text-primary mb-10">Community เส้นทาง</h1>

      <div className="flex flex-col items-center">
        <div>
          <div className="flex flex-wrap justify-evenly w-full">
            {routeList ? (
              routeList.map((route,index)=>(
                <RouteCardList route={route} key={index} />
              ))
            ) : (
              <span className="loading loading-ring loading-lg text-primary"></span>
            )}
          </div>
        </div>
        <div className="font-bold mt-16 text-2xl text-primary">
          พื้นที่ตั้งแคมป์จาก Community
        </div>
        <iframe
          className="mt-3 border-none rounded-xl"
          src="https://www.google.com/maps/d/embed?mid=1rhNqCUE-iLDwcxtRIrKsXa-jMqVgSXIs&ehbc=2E312F"
          width="820"
          height="550"
        ></iframe>
      </div>
    </>
  );
};

export default RouteList;
