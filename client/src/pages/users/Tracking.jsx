import React, { useContext, useEffect, useState } from "react";
import RecentCard from "../../components/Card/recentBookingCardListUser";
import BG from "../../images/BG-Tracking.png";
import Car from "../../images/MotorCar2.png";
import Status from "../../components/Status";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { format, isValid } from "date-fns";
import {
  getBookingDetails,
  getBookingHistory,
  updateBookingStatus,
} from "../../service/rentals";
import { AuthContext } from "../../service/context/AuthContext";
import backgroundImageUrl from "../../images/bgcar.gif";

export const Tracking = () => {
  const { user } = useContext(AuthContext);
  const { bookingId } = useParams();
  const [detailBooking, setDetailBooking] = useState();
  const [historyBooking, setHistoryBooking] = useState();
  const [status, setStatus] = useState("Confirm-Order");
  const [statusTime, setStatusTime] = useState("Test");
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }

  const getStatusNext = (status) => {
    switch (status) {
      case "Wait for Confirm":
        return [
          "รอร้านยืนยันออเดอร์ของคุณ",
          "เตรียมตัวกับการเดินทางครั้งใหม่!",
        ];
      case "Confirm order":
        return ["จัดส่งรถ", "กรุณาคอยรับโทรศัพท์จากร้าน"];
      case "On-delivery":
        return ["รับรถและ เซ็นสัญญา", "เตรียมเอกสารให้พร้อม!"];
      case "Pick-up":
        return ["ดื่มดำกับรถบ้านของคุณ", "ขอให้สนุก !"];
      case "During the rental":
        return ["รอคืนรถ", "ขอให้สนุก !"];
      case "Return":
        return ["รอทางร้านตรวจสอบ"];
      case "Complete":
        return ["ขอบคุณที่ใช้บริการ", "หวังว่าจะกลับมาใหม่ !"];
      case "Cancel":
        return ["ออเดอร์ถูกยกเลิก"];
      default:
        return ["มีบางอย่างผิดพลาด"];
    }
  };

  const fetchDetailBooking = async () => {
    const res = await getBookingDetails(bookingId);
    setDetailBooking(res);
    setStatus(res.rental.RentalStatus);
    setStatusTime(format(new Date(res.rental.updatedAt), "dd-MM-yyyy hh:mm a"));
  };

  const updateStatus = async (bookingId, status) => {
    const res = await updateBookingStatus(bookingId, status);
    fetchDetailBooking();
  };

  useEffect(() => {
    const fetchHistoryBooking = async () => {
      const res = await getBookingHistory(user.id);
      setHistoryBooking(res);
    };

    fetchDetailBooking();
    fetchHistoryBooking();
  }, [bookingId]);

  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPositionY: `bottom`,
  };

  return (
    <>
      {detailBooking && (
        <div className="mx-10">
          <div className="container">
            <div className="font-bold text-3xl">Track Booking</div>
            <div className="text-sm text-gray-400">
              ตรวจสอบสถานะและการจองแบบเรียลไทม์
            </div>
          </div>
          <div className="font-bold text-xl mt-6">
            Booking Preview (สถานะการจอง)
          </div>
          <div className="container shadow-lg bg-white py-10 px-16 rounded-2xl flex justify-between">
            <div>
              <div>
                <div className="text-gray-400 font-bold">รายการ :</div>
                <div className="font-bold text-[#1D4FB1] text-xl">
                  # {detailBooking.rental.RentalID}
                </div>
              </div>
              <div className="my-4">
                <div className="text-gray-400 font-bold">ยานพาหนะ :</div>
                <div className="text-xl font-bold">{`${detailBooking.Car.make} ${detailBooking.Car.model}`}</div>
                <div className="text-sm font-semibold">
                  {detailBooking.Car.plate}
                </div>
              </div>
              <div>
                <div className="text-gray-400 font-bold">สถานะ :</div>
                <div className="flex">
                  <Status status={`${status}`} />
                  {[
                    "Wait for Confirm",
                    "Confirm order",
                    "On-delivery",
                  ].includes(status) && (
                    <button
                      className="btn ml-5 text-2xl bg-white hover:bg-red-500 border-red-500 border-2"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      ⚠️
                    </button>
                  )}
                </div>
                <div className="font-bold text-sm mt-1">{statusTime}</div>
              </div>
              <div>
                <div className="text-gray-400 font-bold mt-6">ที่อยู่ :</div>
                <div className="font-bold">{detailBooking.rental.address}</div>
              </div>

              <div>
                <div className="text-gray-400 font-bold mt-6">
                  เบอร์ติดต่อ (ผู้ให้เช่า) :
                </div>
                <div className="font-bold">{detailBooking.carRental.phone}</div>
              </div>
            </div>
            <div
              className=" border-gray-200 border-2 rounded-lg w-[700px] relative p-4"
              style={containerStyle}
            >
              <div
                className="bg-white border-2 border-gray-50 shadow-lg w-fit px-6 py-4 flex flex-col justify-start
              absolute right-6 top-9"
              >
                <span className="text-sm text-gray-400 font-semibold">
                  ขั้นตอนต่อไป
                </span>
                <span className="text-2xl font-extrabold">
                  {getStatusNext(status)[0]}
                </span>
                <span className="text-xs text-gray-400 font-semibold">
                  {getStatusNext(status)[1]}
                </span>
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

          <div className="text-lg font-bold mt-10">
            Recent Booking (รายการล่าสุด)
          </div>
          <div className="container flex flex-wrap justify-start ml-6">
            {historyBooking &&
              historyBooking.map((booking, index) => (
                <RecentCard key={index} bookingData={booking} />
              ))}
          </div>
        </div>
      )}

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">คำเตือน!</h3>
          <p className="py-4">
            ต้องการยกเลิกหรือไม่ คุณจะได้รับเงินคืน 60% ของการจอง
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn mr-3 btn-error text-white"
                onClick={() => updateStatus(bookingId, "Cancel")}
              >
                ยอมรับ
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
