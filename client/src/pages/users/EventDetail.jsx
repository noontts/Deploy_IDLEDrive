import React, { useState, useEffect } from "react";
import Mapbutton from "../../components/mapbutton";
import { useParams } from "react-router-dom";
import { getDetailEvents } from "../../service/event";
import SanitizeHTML from "../../components/SanitizeHTML";
import BASE_URL from "../../service/baseURL";

export default function EventDetail() {
  const { id } = useParams();
  const [eventDetail, setEventDetail] = useState();
  const imgURL = `${BASE_URL}/api/v1/idledrive/images`;

  useEffect(() => {
    const fetchDetailEvent = async () => {
      const res = await getDetailEvents(id);
      console.log(res);
      setEventDetail(res);
    };

    fetchDetailEvent();
  }, [id]);

  return (
    <>
      {eventDetail ? (
        <>
          <div className="text-center m-10 text-4xl font-bold text-primary">
            Event
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <img
              src={`${imgURL}/${eventDetail.EventImages[0].imageURL}`}
              alt="camp"
              className="w-1/3 h-60 object-cover rounded-lg"
            />
            <div className="w-1/2 flex justify-around items-center mt-10">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {eventDetail.eventName}
                </div>
                <div className="text-base font-semibold">
                  {eventDetail.eventDate} | {eventDetail.eventTime} น.
                </div>
              </div>
              <div className="text-sm">🗺️ {eventDetail.locationName}</div>
            </div>
            <div className="w-1/2 mt-10 indent-10 whitespace-pre-line">{eventDetail.content}</div>

            <div className="text-center mt-10 mb-3 text-3xl font-bold text-primary">
              สถานที่
            </div>

            <div className="relative">
              <SanitizeHTML html={eventDetail.embedLink} />
              <div className="absolute right-5 bottom-5">
                <Mapbutton href={eventDetail.locationLink} />
              </div>
            </div>

            <div className="text-center mt-10 mb-3 text-2xl font-bold text-primary">
              สิ่งอำนวยความสะดวก
            </div>
            <label className="input input-bordered p-3">
              {eventDetail.feature}
            </label>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
      )}
    </>
  );
}
