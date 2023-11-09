import React, { useState } from "react";
import { registerUser } from "../../service/cars_rental";
import { useNavigate } from "react-router-dom";

export default function BackOfficeRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rentalname: "",
    fname: "",
    lname: "",
    phone: "",
    email: "",
    deployCar: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      document.getElementById("my_modal_1").showModal();
    } else {
      const user = {
        rental_name: formData.rentalname,
        FirstName: formData.fname,
        LastName: formData.lname,
        phone: formData.phone,
        email: formData.email,
        location: formData.deployCar,
        username: formData.username,
        password: formData.password,
      };
      const res = await registerUser(user);
      console.log("Form Data:", formData);
      console.log(res);

      document.getElementById("my_modal_4").showModal();

      setTimeout(() => {
        document.getElementById("my_modal_4").close();
        navigate("/merchant");
      }, 3000);
    }
  };

  return (
    <>
      <div className="text-4xl font-medium text-center mt-5">
        สมัครสมาชิก |
        <span className="text-4xl font-medium text-blue-700">
          {" "}
          ผู้ปล่อยเช่า
        </span>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="w-1/2 mx-auto my-10 py-10 px-5 bg-white border-[#D9D9D9] border-2 shadow-xl flex flex-col items-center rounded-xl drop-shadow-lg">
          <div className="mx-10 w-9/12">
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="Rental_name"
                  className="mb-3 block text-base font-medium"
                >
                  ชื่อร้านของคุณ
                </label>
                <input
                  required
                  value={formData.rentalname}
                  onChange={handleInputChange}
                  type="text"
                  name="rentalname"
                  id="rentalname"
                  placeholder="ชื่อร้าน"
                  className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="fName"
                  className="mb-3 block text-base font-medium"
                >
                  ชื่อจริง
                </label>
                <input
                  required
                  value={formData.fname}
                  onChange={handleInputChange}
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="First Name"
                  className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="lName"
                  className="mb-3 block text-base font-medium"
                >
                  นามสกุล
                </label>
                <input
                  required
                  value={formData.lname}
                  onChange={handleInputChange}
                  type="text"
                  name="lname"
                  id="lname"
                  placeholder="Last Name"
                  className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="mb-3 block text-base font-medium"
                >
                  Phone
                </label>
                <input
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel"
                  maxLength={10}
                  minLength={9}
                  pattern="[0-9]{9,10}"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium"
                >
                  Email
                </label>
                <input
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="mx-10 w-9/12">
            <div className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="deployCar"
                  className="mb-3 block text-base font-medium"
                >
                  สถานที่ปล่อยเช่ารถ
                </label>
                <input
                  required
                  value={formData.deployCar}
                  onChange={handleInputChange}
                  type="text"
                  name="deployCar"
                  id="deployCar"
                  placeholder="สถานที่ปล่อยเช่ารถ"
                  className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center my-5 max-w-lg">
            <span className="w-44 border border-gray-400"></span>
            <span className="px-4 w-44 bg-white text-center uppercase text-sm text-primary">
              User & password
            </span>
            <span className="w-44 border border-gray-400"></span>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="mb-3 block text-base font-medium"
                >
                  Username
                </label>
                <input
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="mb-3 block text-base font-medium"
                >
                  Password
                </label>
                <input
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="mx-10 w-9/12 flex">
            <div className="w-1/2 px-3"></div>
            <div className="w-1/2 pl-3">
              <div className="mb-5">
                <label
                  htmlFor="Confirm-Password"
                  className="mb-3 block text-base font-medium"
                >
                  Confirm-Password
                </label>
                <input
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  type="password"
                  name="confirmPassword"
                  id="Confirm-Password"
                  placeholder="Confirm-Password"
                  className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-8 bg-blue-700 text-white w-full max-w-lg mx-auto hover:bg-sky-400"
          >
            Sign Up
          </button>
        </div>
      </form>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">เกิดข้อผิดพลาด!</h3>
          <p className="py-4">รหัสผ่านไม่ตรงกัน กรุณาลองใหม่อีกครั้ง</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-96 max-w-5xl">
          <h3 className="font-extrabold text-xl text-primary text-center">
            สมัครเสร็จสิ้น!
          </h3>
          <p className="py-4 text-lg flex flex-col justify-center items-center">
            <span>
              รอเจ้าหน้าที่ติดต่อกลับ{" "}
              <span className="text-red-500 font-extrabold">7-15</span> วันทำการ
            </span>
            ขอบคุณที่ร่วมเดินทางกับเรา
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => navigate("/merchant")}>
                รับทราบ
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
