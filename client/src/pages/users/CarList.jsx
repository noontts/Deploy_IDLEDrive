import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import CarlistCard from "../../components/Card/cardCarListUser";
import { format } from "date-fns";
import { getCarListAvailability } from "../../service/rentals";

export const CarList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [carList, setCarlist] = useState([]);
  const pickupDate = searchParams.get("pick-up");
  const returnDate = searchParams.get("return");
  const location = searchParams.get("location");
  const [locationInput, setLocationInput] = useState(location);
  const [searchClicked, setSearchClicked] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: pickupDate ? new Date(pickupDate) : tomorrow,
      endDate: returnDate ? new Date(returnDate) : tomorrow,
      key: "selection",
    },
  ]);
  const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
  const [sortByRatingAsc, setSortByRatingAsc] = useState(true);
  const [selectedType, setSelectedType] = useState(null);

  const handleSortByPrice = () => {
    setSortByPriceAsc(!sortByPriceAsc);
    const sortedCars = carList.slice().sort((a, b) => {
      if (sortByPriceAsc) {
        return a.rentalRate - b.rentalRate || a.car_id - b.car_id;
      } else {
        return b.rentalRate - a.rentalRate || b.car_id - a.car_id;
      }
    });

    setCarlist(sortedCars);
  };

  const handleSortByRating = () => {
    setSortByRatingAsc(!sortByRatingAsc);
    const sortedCars = carList.slice().sort((a, b) => {
      const ratingA = a.reviews.averageRating;
      const ratingB = b.reviews.averageRating;

      if (ratingA === null) return sortByRatingAsc ? 1 : -1;
      if (ratingB === null) return sortByRatingAsc ? -1 : 1;

      if (sortByRatingAsc) {
        return ratingA - ratingB || a.car_id - b.car_id;
      } else {
        return ratingB - ratingA || b.car_id - a.car_id;
      }
    });

    setCarlist(sortedCars);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const filterCarsByType = (cars) => {
    if (!selectedType) {
      return cars;
    }
    return cars.filter((car) => car.type === selectedType);
  };

  const handleSortByType = (type) => {
    handleTypeChange(type);
  };

  let queryParams = {
    pickup_date: format(date[0].startDate, "yyyy-MM-dd"),
    return_date: format(date[0].endDate, "yyyy-MM-dd"),
    location_input: locationInput,
  };

  const fetchCarList = async () => {
    try {
      const response = await getCarListAvailability(
        format(date[0].startDate, "yyyy-MM-dd"),
        format(date[0].endDate, "yyyy-MM-dd"),
        locationInput
      );

      const filteredCars = filterCarsByType(response);
      setCarlist(filteredCars);
      console.log(filteredCars);
    } catch (error) {
      console.error("Error fetching car list:", error);
    }
  };

  useEffect(() => {
    if (
      !searchClicked ||
      pickupDate !== null ||
      returnDate !== null ||
      location !== null
    ) {
      fetchCarList();
      setSearchClicked(false);
    }
  }, [searchClicked, pickupDate, returnDate, location, selectedType]);

  const handleSearchClick = () => {
    if (locationInput === "") {
      document.getElementById('my_modal_1').showModal();
      return;
    }
    setSearchClicked(true);
    searchParams.set("pick-up", format(date[0].startDate, "yyyy-MM-dd"));
    searchParams.set("return", format(date[0].endDate, "yyyy-MM-dd"));
    searchParams.set("location", locationInput);

    navigate(`?${searchParams.toString()}`);
  };

  return (
    <>
      <div className="flex flex-col w-full border-b-2 p-5 items-center md:flex-row">
        <div>
          สถานที่
          <select 
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            required className="input input-bordered w-full max-w-xs my-4 px-3 bg-white border-2 focus:outline-blue-700">
              <option value='' disabled selected>สถานที่</option>
              <option value="ท่าอากาศยานเชียงใหม่">ท่าอากาศยานเชียงใหม่</option>
              <option value="ประตูท่าแพ">ประตูท่าแพ</option>
              <option value="มหาวิทยาลัยเชียงใหม่">มหาวิทยาลัยเชียงใหม่</option>
              <option value="MAYA เมย่า">MAYA เมย่า</option>
              <option value="เซ็นทรัลเชียงใหม่ แอร์พอร์ต">เซ็นทรัลเชียงใหม่ แอร์พอร์ต</option>
          </select>
          {/* <input
            type="text"
            placeholder="โปรดระบุสถานที่ของท่าน"
            className="input input-bordered w-full max-w-xs my-4"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          /> */}
        </div>
        <div className="md:ml-10">
          วันเดือนปี
          <div
            className="flex h-fit items-center border-2 relative
         p-3 rounded-lg my-4 px-16"
          >
            <div
              className="text-base"
              onClick={() => {
                setOpenDate(!openDate);
              }}
            >
              {`${format(date[0].startDate, "dd/MM/yyyy")} `}
              <box-icon name="chevron-right" size="xs" />
              {` ${format(date[0].endDate, "dd/MM/yyyy")}`}
            </div>

            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={tomorrow}
                className="absolute top-full left-0 z-20"
              />
            )}
          </div>
        </div>
        <div className="md:ml-20 md:mt-6">
          <button
            className="bg-[#1D4FB1] px-10 py-3 text-white rounded-2xl
          font-bold"
            onClick={() => handleSearchClick()}
          >
            ค้นหา
          </button>
        </div>
      </div>
      <div>
        <div className="flex w-full border-b-2 p-5">
          <button
            className="mr-5 bg-white shadow-md py-2 px-4 rounded-lg hover:shadow-lg"
            onClick={handleSortByPrice}
          >
            ราคา
          </button>
          <button
            className="mr-5 bg-white shadow-md py-2 px-4 rounded-lg hover:shadow-lg"
            onClick={handleSortByRating}
          >
            ความนิยม
          </button>
          <details className="dropdown">
            <summary className="btn border-none shadow-md font-normal text-base bg-white">
              ประเภท
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52">
              <li>
                <a onClick={() => handleSortByType(null)}>All</a>
              </li>
              <li>
                <a onClick={() => handleSortByType("Motorhome")}>Motorhome</a>
              </li>
              <li>
                <a onClick={() => handleSortByType("Campervan")}>Campervan</a>
              </li>
              <li>
                <a onClick={() => handleSortByType("Campercar")}>Campercar</a>
              </li>
              <li>
                <a onClick={() => handleSortByType("Caravan")}>Caravan</a>
              </li>
            </ul>
          </details>
        </div>
      </div>
      <div className="p-5">
        <div className="text-gray-400">{carList.length} ผลลัพธ์</div>
        <div className="flex flex-row flex-wrap justify-evenly">
          {carList && carList.length > 0 ? (
            carList.map((carData, index) => (
              <CarlistCard
                key={index}
                queryParams={queryParams}
                carData={carData}
              />
            ))
          ) : (
            <div className="w-full h-[200px] flex justify-center items-center text-[#1D4FB1]">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          )}
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">เกิดข้อผิดพลาด!</h3>
          <p className="pt-2 text-xl">กรุณาใส่สถานที่ . . .</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">รับทราบ</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
