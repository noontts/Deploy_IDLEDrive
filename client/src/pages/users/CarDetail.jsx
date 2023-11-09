import React, { useState, useEffect, useContext } from "react";
import ImageDetailShow from "../../components/ImageDetail";
import Section from "../../components/Section";
import { useParams, useSearchParams, useNavigate,Link } from "react-router-dom";
import CommentReviewCar from "../../components/Comment/commentCar";
import { getDetailCar } from "../../service/cars";
import { format, eachDayOfInterval } from "date-fns";
import { AuthContext } from "../../service/context/AuthContext";
import BASE_URL from "../../service/baseURL";

export const CarDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();
  const pickupDate = searchParams.get("pick-up");
  const returnDate = searchParams.get("return");
  const [dateRange, setDateRange] = useState([]);
  const location = searchParams.get("location");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDetailCar = async () => {
      const response = await getDetailCar(id);
      setCarDetail(response);
      console.log(response);
    };

    const calculateDateRange = () => {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);

      const range = eachDayOfInterval({ start, end });
      const formattedRange = range.map((date) => format(date, "yyyy-MM-dd"));

      setDateRange(formattedRange);
    };

    calculateDateRange();
    fetchDetailCar();
  }, [id, pickupDate, returnDate]);

  return (
    <>
      {carDetail && (
        <div className="flex flex-col justify-evenly lg:flex-row">
          <div className="w-full lg:w-3/6">
            <div className="mb-6 mt-3">
              <div className="text-sm breadcrumbs">
                <ul>
                  <li>
                    <Link to={'/'}>Home</Link>
                  </li>
                  <li>
                    <Link to={`/car-list?pick-up=${pickupDate}&return=${returnDate}&location=${location}`}>ค้นหา</Link>
                  </li>
                  <li>{`${carDetail.car.make} ${carDetail.car.model}`}</li>
                </ul>
              </div>
              <h1 className="font-bold text-3xl mb-2 mt-4">{`${carDetail.car.make} ${carDetail.car.model}`}</h1>
              <div className="flex">
                <span className="font-semibold">
                  {parseFloat(
                    carDetail.carReview.averageRating.averageRating
                  ).toFixed(2)}
                </span>
                <box-icon type="solid" name="star" color="yellow" />
                <div>
                  ({carDetail.carReview.averageRating.ratingCount} รีวิว)
                </div>
              </div>
            </div>

            {carDetail.listImage && (
              <ImageDetailShow imgList={carDetail.listImage} />
            )}
            <Section title={"ผู้ให้เช่ารถ"}>
              <div className="flex items-center">
                <div className="avatar mr-4">
                  <div className=" w-20 rounded-full">
                    <img
                      src={`${BASE_URL}/api/v1/idledrive/images/${carDetail.rental.rentalDetail.profileURL}`}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-semibold">
                    {carDetail.rental.rentalDetail.rental_name}
                  </div>
                  <div>
                    <span>{carDetail.rental.rentalReview.averageRating}</span>
                    <box-icon
                      size="xs"
                      type="solid"
                      name="star"
                      color="yellow"
                    />
                    <span className="ml-2">
                      ({carDetail.rental.rentalReview.reviewCountSum} รีวิว)
                    </span>
                  </div>
                </div>
              </div>
            </Section>
            <Section title={"คำอธิบาย"}>
              <p className="whitespace-pre-line">{carDetail.car.description}</p>
            </Section>
            <Section title={"คุณสมบัติ"}>
              <p className="whitespace-pre-line">{carDetail.car.feature}</p>
            </Section>
            <div className="w-full border-2 my-4"></div>
            <Section title={"Review"}>
              <div className="flex justify-center">
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                      </svg>
                    </div>
                    <div className="stat-title">Total Review</div>
                    <div className="stat-value text-[#1D4FB1]">
                      {carDetail.carReview.averageRating.ratingCount}
                    </div>
                    <div className="stat-desc">Total Review in this year</div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                    </div>
                    <div className="stat-title">Average Rating</div>
                    <div className="stat-value text-[#1D4FB1]">
                      {parseFloat(
                        carDetail.carReview.averageRating.averageRating
                      ).toFixed(2)}
                    </div>
                    <div className="stat-desc">Average Rating in this year</div>
                  </div>
                </div>
              </div>
              {carDetail.carReview.carReviews &&
                carDetail.carReview.carReviews.map((review, index) => (
                  <CommentReviewCar key={index} review={review} />
                ))}
            </Section>
          </div>
          <div className="mt-36">
            <div className="w-full lg:w-[400px] h-fit shadow-md p-5 flex flex-col justify-center rounded-xl sticky top-28">
              <span className="font-bold text-2xl mb-10">ระยะเวลา</span>

              <div className="pb-2 border-b-2">
                <div className="flex justify-between">
                  <span>ค่าเช่ารถ {dateRange.length} วัน</span>
                  <div>฿{carDetail.car.rentalRate * dateRange.length}</div>
                </div>
                <span className="text-xs text-gray-600">
                  ราคาต่อวัน ฿{carDetail.car.rentalRate} x {dateRange.length}{" "}
                  วัน
                </span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <span className="font-bold">ราคารวมทั้งหมด</span>
                  <div className="font-bold text-2xl">
                    ฿{carDetail.car.rentalRate * dateRange.length + 5000}
                  </div>
                </div>
                <div className="flex justify-between mb-10">
                  <span className="text-xs text-gray-600">
                    ค่ามัดจำในวันรับรถ (ได้คืนในวันคืนรถ)
                  </span>
                  <div className="text-xs">฿5,000</div>
                </div>
              </div>
              <button
                className="bg-[#1D4FB1] w-full py-2 rounded-lg text-white font-bold"
                onClick={() => {
                  user !== null
                    ? navigate(
                        `/motorhome/${id}/checkout?pick-up=${pickupDate}&return=${returnDate}&location=${location}`,
                        {
                          state: {
                            rental_range: dateRange.length,
                            total_rate:
                              carDetail.car.rentalRate * dateRange.length,
                            rental_id: carDetail.car.car_rental_id_rental,
                          },
                        }
                      )
                    : navigate("/login");
                }}
              >
                {" "}
                ยืนยัน{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
