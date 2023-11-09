import React, { useContext, useEffect, useState } from "react";
import Back_myCarList from "../../components/Card/myCarList_BackOffice";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../service/context/AuthContext";
import { getCarListMerChant } from "../../service/cars_rental";

export const CarRentalList = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    const fetchCarlist = async () => {
      const res = await getCarListMerChant(user.id_rental);
      setCarList(res.car);
      console.log(res.car);
    };

    fetchCarlist();
  }, [user.id_rental]);

  return (
    <>
      {carList && (
        <>
          <div className="flex justify-around my-10">
            <div className="text-center font-bold text-4xl text-blue-700 ">
              My Vehicle
            </div>
            <button
              className="btn h-14 w-32 rounded-2xl shadow-lg drop-shadow-lg bg-blue-800 border-gray-400 text-white text-lg font-bold hover:bg-blue-700 hover:border-gray-400"
              onClick={() => navigate("/merchant/addcar")}
            >
              {" "}
              + เพิ่มรถ{" "}
            </button>
          </div>
          <div>
            {carList.map((car, index) => (
              <Back_myCarList key={index} data="activate" carData={car} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
