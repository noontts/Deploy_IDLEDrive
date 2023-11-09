import React, { useContext, useEffect, useState } from "react";
import CollapseForm from "../../components/CollapseForm";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { bookRental } from "../../service/rentals";
import { AuthContext } from "../../service/context/AuthContext";
import { getDetailCar } from "../../service/cars";
import { format, eachDayOfInterval } from "date-fns";
import DriverInfomationForm from "../../components/Form/DriverInfomation";
import { updateDriverInformation } from "../../service/users";
import ProtectionOption from "../../components/Form/ProtectionOption";
import PaymentInfomation from "../../components/Form/PaymentInfomation";
import BASE_URL from "../../service/baseURL";

export const CarCheckout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const pickupDate = searchParams.get("pick-up");
  const returnDate = searchParams.get("return");
  const location = searchParams.get("location");// รับค่า location จาก URL parameters
  const [dateRange, setDateRange] = useState([]);
  const [carDetail, setCarDetail] = useState();
  const { rental_range, total_rate, rental_id } = useLocation().state;
  const [driverDoc, setDriverDoc] = useState();
  const [isCheck, setIsCheck] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    location:location,
    idcardFile: null,
    licenseFile: null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onSubmit = async () => {
    if (
      !formData.fname ||
      !formData.lname ||
      !formData.email ||
      !formData.phone ||
      !formData.location ||
      (!driverDoc && (!formData.idcardFile || !formData.licenseFile))
    ) {
      console.error("Please fill in all required fields.");
      document.getElementById('my_modal_3').showModal();
      return;
    }

    if(!isCheck){
      document.getElementById('my_modal_6').showModal();
      return;
    }

    const Rentals = {
      car_idcar: id,
      RentalStartDate: pickupDate,
      RentalEndDate: returnDate,
      user_id: user.id,
      address: formData.location, //เอามาใส่ตรงนี้
      TotalCost: total_rate + 5000,
      carRental_id: rental_id,
    };
    console.log(Rentals);

    const formPost = new FormData();
    formPost.append("email", formData.email);
    formPost.append("FirstName", formData.fname);
    formPost.append("LastName", formData.lname);
    formPost.append("phone", formData.phone);
    formPost.append("Document", formData.idcardFile);
    formPost.append("Document", formData.licenseFile);

    const Driver = await updateDriverInformation(user.id, formPost);
    console.log("Driver", Driver);

    const booking = await bookRental(Rentals);

    if(!booking){
      document.getElementById('my_modal_4').showModal();
      return;
    }

    console.log("[Booking System]-Booking !", booking);
    navigate(`/tracking/user/${booking.rental.RentalID}`);
  };

  useEffect(() => {
    const fetchDetailCar = async () => {
      const res = await getDetailCar(id);
      console.log(res);
      setCarDetail(res);
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
      {carDetail ? (
        <div className="mx-6 flex">
          <div className="w-3/6">
            <div className="card card-side bg-white shadow-xl h-[270px]">
              <figure className="w-2/5">
                <img
                  className="h-full object-cover"
                  src={`${BASE_URL}/api/v1/idledrive/images/${carDetail.listImage[0].imageURL}`}
                  alt="Car"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">
                  {carDetail.car.make} {carDetail.car.model}
                </h2>
                <span className="font-semibold">{dateRange.length} วัน</span>
                <span className="font-semibold text-lg mt-2">
                  รับรถ : {pickupDate}
                </span>
                <span className="font-semibold text-lg">
                  ส่งคืน : {returnDate}
                </span>
                <div className="flex items-center mt-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={`${BASE_URL}/api/v1/idledrive/images/${carDetail.rental.rentalDetail.profileURL}`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col ml-3">
                    <span className="font-semibold">
                      {carDetail.rental.rentalDetail.rental_name}
                    </span>
                    <span>
                      ⭐
                      {carDetail.rental.rentalReview.averageRating
                        ? carDetail.rental.rentalReview.averageRating
                        : 0}
                      ({carDetail.rental.rentalReview.reviewCountSum})
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-14">
              <p className="mb-4 font-bold text-xl ml-2"><span className="text-red-500">สำคัญ</span> กรุณาอ่านด้านล่างให้ครบ <span className="text-red-500">*</span></p>
              <CollapseForm title={"Driver Information ( ข้อมูลผู้ขับขี่ )"}>
                <DriverInfomationForm form={formData} handleChange={handleInputChange} setForm={setFormData} userID={user.id} driverDoc={driverDoc} setDriverDoc={setDriverDoc}/>
              </CollapseForm>
              <CollapseForm title={"Payment Information ( ช่องทางการชำระเงิน )"}>
              <PaymentInfomation/>
              </CollapseForm>
              <CollapseForm title={"Protection options ( เอกสารที่ต้องเตรียม )"}>
                <ProtectionOption title={carDetail.car.type} setIsCheck={setIsCheck} isCheck={isCheck}/>
              </CollapseForm>
            </div>
          </div>

          <div
            className="flex flex-col justify-center items-center w-2/6 h-full bg-white shadow-md ml-20
      p-6 sticky top-20 rounded-lg"
          >
            <p className="font-bold text-lg">ราคาโดยรวม</p>
            <div className="flex w-full justify-between mb-2">
              <span>ค่าเช่ารถ {rental_range} วัน</span>
              <div>฿{total_rate}</div>
            </div>
            <div className="flex w-full justify-between mb-2">
              <span>ค่าจัดส่ง</span>
              <div className="text-green-500">฿0</div>
            </div>
            <div className="flex w-full justify-between mb-2">
              <span>ค่ามัดจำในวันรับรถ (ได้คืนในวันคืนรถ)</span>
              <div>฿5,000</div>
            </div>
            <div className="w-full border-2 my-4"></div>
            <div className="flex w-full justify-between font-bold text-xl mt-2">
              <span>ยอดรวม</span>
              <div>฿{total_rate + 5000}</div>
            </div>
            <button
              className="bg-[#1D4FB1] w-full py-2 rounded-lg text-white font-bold mt-3"
              onClick={onSubmit}
            >
              ยืนยันการจอง
            </button>
          </div>
        </div>
      ):(
        <div className="flex justify-center items-center w-full h-96">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      )}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">เกิดข้อผิดพลาด!</h3>
          <p className="py-4">
            กรุณากรอกรายละเอียดให้ครบ!
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">เกิดข้อผิดพลาด!</h3>
          <p className="py-4">
            เกิดข้อผิดพลาด กรุณาลองใหม่!
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={()=>navigate(`/`)}>Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_6" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">เกิดข้อผิดพลาด!</h3>
          <p className="py-4">
            กรุณาอ่านรายละเอียด, กดยอมรับใน ProtectionOptions
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
