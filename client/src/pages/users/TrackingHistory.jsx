import React, { useContext, useEffect, useState } from "react";
import BG from "../../images/BG-Tracking.png";
import Car from "../../images/MotorCar2.png";
import Status from "../../components/Status";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { getBookingDetails} from "../../service/rentals";
import { AuthContext } from '../../service/context/AuthContext'
import ReviewComponent from '../../components/ReviewComponent'

export const TrackingHistory = () => {
  const { user } = useContext(AuthContext);
  const { bookingId } = useParams();
  const [detailBooking, setDetailBooking] = useState();
  const [status, setStatus] = useState("Confirm-Order");
  const [statusTime, setStatusTime] = useState("Test");
  const navigate = useNavigate();
  if(!user){
    navigate('/')
  }
  
  const getStatusNext = (status) => {
    switch (status) {
      case "Wait for Confirm":
        return ["รอร้านยืนยันออเดอร์ของคุณ","เตรียมตัวกับการเดินทางครั้งใหม่!"];
      case "Confirm order":
        return ["จัดส่งรถ","กรุณาคอยรับโทรศัพท์จากร้าน"];
      case "On-delivery":
        return ["รับรถและ เซ็นสัญญา","เตรียมเอกสารให้พร้อม!"];
      case "Pick-up":
        return ["ดื่มดำกับรถบ้านของคุณ","ขอให้สนุก !"];
      case "During the rental":
        return ["รอคืนรถ","ขอให้สนุก !"];
      case "Return":
        return ["รอทางร้านตรวจสอบ"];
      case "Complete":
        return ["ขอบคุณที่ใช้บริการ","หวังว่าจะกลับมาใหม่ !"];
      case "Cancel":
        return ["ออเดอร์ถูกยกเลิก"];
      default:
        return ["มีบางอย่างผิดพลาด"];
    }
  };

  useEffect(() => {

    const fetchDetailBooking = async () => {
      const res = await getBookingDetails(bookingId);
      setDetailBooking(res);
      console.log(res);
      setStatus(res.rental.RentalStatus);
      setStatusTime(
        format(new Date(res.rental.updatedAt), "dd-MM-yyyy hh:mm a")
      );
    };

    fetchDetailBooking();

  }, [bookingId]);

  return (
    <>
      {detailBooking && (
        <div className="mx-10">
          <div className="container">
            <div className="font-bold text-2xl">Track Booking</div>
            <div className="text-sm text-gray-400">
              Monitor Status and Booking in Real-Time
            </div>
          </div>
          <div className="font-bold text-xl mt-6">Booking Preview</div>
          <div className="container shadow-lg bg-white py-10 px-16 rounded-2xl flex justify-between">
            <div>
              <div>
                <div className="text-gray-400 font-bold">ORDERS:</div>
                <div className="font-bold text-[#1D4FB1] text-xl">
                  # {detailBooking.rental.RentalID}
                </div>
              </div>
              <div className="my-4">
                <div className="text-gray-400 font-bold">VEHICLE:</div>
                <div className="text-xl font-bold">{`${detailBooking.Car.make} ${detailBooking.Car.model}`}</div>
                <div className="text-sm font-semibold">
                  {detailBooking.Car.plate}
                </div>
              </div>
              <div>
                <div className="text-gray-400 font-bold">STATUS:</div>
                <div>
                  <Status status={`${status}`} />
                </div>
                <div className="font-bold text-sm mt-1">{statusTime}</div>
              </div>
              <div>
                <div className="text-gray-400 font-bold mt-6">ADDRESS:</div>
                <div className="font-bold">
                {detailBooking.rental.address}
                </div>
              </div>
              <div>
                <div className="text-gray-400 font-bold mt-6">เบอร์ติดต่อ (ผู้ให้เช่า) :</div>
                <div className="font-bold">
                  {detailBooking.carRental.phone}
                </div>
              </div>
            </div>
            <div className=" border-gray-200 border-2 rounded-lg w-[700px] relative p-4">
              <div className="bg-white border-2 border-gray-50 shadow-lg w-fit px-6 py-4 flex flex-col justify-start
              absolute right-6 top-9">
                  <span className="text-sm text-gray-400 font-semibold">ขั้นตอนต่อไป</span>
                  <span className="text-2xl font-extrabold">{getStatusNext(status)[0]}</span>
                  <span className="text-xs text-gray-400 font-semibold">{getStatusNext(status)[1]}</span>
              </div>
              <div className="absolute inset-x-0 bottom-4">
                <img src={BG} alt="" />
              </div>
              <motion.div
                className="w-56 absolute inset-x-4 bottom-4"
                animate={{ x: [0, 200, 0] }}
                transition={{ repeat: Infinity, duration: 7 }}
              >
                <img
                  src={Car}
                  alt="Car Image"
                  style={{ width: "100%", height: "auto" }}
                />
              </motion.div>
            </div>
          </div>

          <div className="container flex flex-wrap justify-start ml-6">
            {detailBooking.rental.review ? null : <ReviewComponent carID={detailBooking.Car.car_id} RentalID={detailBooking.rental.RentalID}/>}
          </div>
        </div>
      )}
    </>
  );
};
