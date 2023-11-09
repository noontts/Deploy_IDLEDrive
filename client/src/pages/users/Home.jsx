import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

import logo from "../../images/idle-w-light.png";
import backdrop from "../../images/motorhome.jpg";

export const Home = () => {
  const [location, setLocation] = useState("");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: tomorrow,
      endDate: tomorrow,
      key: "selection",
    },
  ]);

  const navigate = useNavigate();


  const handleBookingClick = () => {
    if (!location.trim()) {
      document.getElementById('my_modal_1').showModal();
      return;
    }

    const pickupDate = `${format(date[0].startDate, "yyyy-MM-dd")}`;
    const returnDate = `${format(date[0].endDate, "yyyy-MM-dd")}`;

    navigate(
      `/car-list?pick-up=${pickupDate}&return=${returnDate}&location=${location}`
    );
  };

  return (
    <div className="flex flex-col items-center h-[800px]">
      <img src={logo} className="h-40" />
      <h1 className="text-3xl font-bold text-center">
        Roam,Relex, Rent : Your Road to Home on Wheels!
      </h1>
      <div className="flex flex-col items-center h-fit relative z-30 w-full">
        <div
          className="flex flex-col justify-center items-center w-[1300px] shadow-2xl 
          h-60 p-5 mt-4 rounded-3xl relative z-20 bg-white
          sm:w-[640px]
          md:w-[768px]
          max-[640px]:w-full"
        >

          <select 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required className="input w-full max-w-xs my-4 px-3 bg-gray-100 border-none focus:outline-blue-700">
              <option value='' disabled selected>สถานที่</option>
              <option value="ท่าอากาศยานเชียงใหม่">ท่าอากาศยานเชียงใหม่</option>
              <option value="ประตูท่าแพ">ประตูท่าแพ</option>
              <option value="มหาวิทยาลัยเชียงใหม่">มหาวิทยาลัยเชียงใหม่</option>
              <option value="MAYA เมย่า">MAYA เมย่า</option>
              <option value="เซ็นทรัลเชียงใหม่ แอร์พอร์ต">เซ็นทรัลเชียงใหม่ แอร์พอร์ต</option>
          </select>
          {/* <input
            type="text"
            placeholder="สถานที่"
            className="input w-full max-w-xs my-4 bg-gray-100 border-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          /> */}
          <div
            className="flex flex-row rounded-lg border-2 border-stone-400 p-4 w-[600px] relative
          max-[640px]:flex-col max-[640px]:w-full"
          >
            <div
              className="flex ml-5 pr-24 border-r-2 border-stone-400 max-[640px]:border-none max-[640px]:p-0"
              onClick={() => {
                setOpenDate(!openDate);
              }}
            >
              <box-icon color="#1D4FB1" name="calendar" size="lg" />

              <div className="flex flex-col ml-5">
                <span className="font-bold">{`${format(
                  date[0].startDate,
                  "dd/MM/yyyy"
                )}`}</span>
                <span>{`${format(date[0].startDate, "eeee")}`}</span>
              </div>
            </div>

            <div
              className="flex ml-5 max-[640px]:mt-2 max-[640px]:w-full"
              onClick={() => {
                setOpenDate(!openDate);
              }}
            >
              <box-icon color="#1D4FB1" name="calendar" size="lg" />
              <div className="flex flex-col ml-5">
                <span className="font-bold">{`${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                <span>{`${format(date[0].endDate, "eeee")}`}</span>
              </div>
            </div>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={tomorrow}
                className="absolute top-20 right-24 z-50 max-[640px]:right-0"
              />
            )}
          </div>

          <button
            className="bg-[#1D4FB1] text-white text-2xl rounded-xl px-32 py-2 shadow-lg
        absolute -bottom-6 z-10 font-bold max-[350px]:w-full max-[350px]:px-10"
            onClick={handleBookingClick}
          >
            ค้นหา
          </button>
        </div>
        <div className="absolute z-0 top-1/2">
          <img
            src={backdrop}
            className="w-[1500px] object-none object-center
            rounded-3xl h-[450px]"
          />
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">เกิดข้อผิดพลาด!</h3>
          <p className="pt-2 text-xl">
            กรุณาใส่สถานที่ . . .
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">รับทราบ</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
