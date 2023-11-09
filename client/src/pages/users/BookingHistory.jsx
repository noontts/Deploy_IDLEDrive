import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../service/context/AuthContext";
import { getBookingHistoryAll } from "../../service/rentals";
import HistoryCard from "../../components/Card/HistoryCard";

export const BookHistory = () => {
  const [bookingHistory, setBookingHistory] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchHistoryBooking = async () => {
      const res = await getBookingHistoryAll(user.id);
      setBookingHistory(res);
      console.log(res);
    };

    fetchHistoryBooking();
  }, [user.id]);

  return (
    <>
      <div className="flex justify-around my-10 flex-col">
        <div className="text-center font-bold text-5xl mt-30 text-primary">ประวัติ</div>

        {/* <div className="mt-[-80px] mr-20">
          <div className="flex items-center justify-end m-5 mb-5">
            <div className="w-7 h-7 bg-[#06de9d]"></div>
            <div className="ml-5 font-bold ">Complete</div>
          </div>

          <div className="flex items-center justify-end mb-5">
            <div className="w-7 h-7 bg-[#ffe351]"></div>
            <div className="ml-5 font-bold ">In progress</div>
          </div>

          <div className="flex items-center justify-end mr-8 ">
            <div className="w-7 h-7 bg-[#e84e40]"></div>
            <div className="ml-5 font-bold ">Cancel</div>
          </div>
        </div> */}
      </div>

      <div className="w-3/4 flex flex-col mx-auto my-10">
        {bookingHistory &&
          bookingHistory.map((booking, index) => <HistoryCard key={index} data={booking} />)}
      </div>
    </>
  );
};
