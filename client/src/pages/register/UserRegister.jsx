import React, { useState } from "react";
import { createUser } from "../../service/users";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    job: "",
    age: "",
    idcard: null,
    license: null,
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      document.getElementById("my_modal_1").showModal();
    } else {
      const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        FirstName: formData.fname,
        LastName: formData.lname,
        Birth: formData.age,
        phone: formData.phone,
      };

      try {
        const res = await createUser(user);
        console.log("Form submitted:", user);
        navigate("/");
      } catch (error) {
        document.getElementById("my_modal_2").showModal();
      }
    }
  };

  return (
    <>
      <div className="text-4xl font-medium text-center mt-5">
        สมัครสมาชิก |
        <span className="text-4xl font-medium text-blue-700"> ผู้ใช้งาน</span>
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 mx-auto my-10 py-10 px-5 bg-white border-[#D9D9D9] border-2 shadow-xl flex flex-col items-center rounded-xl drop-shadow-lg"
        >
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="fName"
                  className="mb-3 block text-base font-medium"
                >
                  ชื่อจริง
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="fname"
                    id="fname"
                    placeholder=""
                    className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={formData.fname}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="fname"
                    className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transform -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
                  >
                    First Name
                  </label>
                </div>
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
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="lname"
                    id="lname"
                    placeholder=""
                    className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={formData.lname}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="lname"
                    className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transform -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
                  >
                    Last Name
                  </label>
                </div>
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
                <div className="relative">
                  <input
                    required
                    type="tel"
                    maxLength={10}
                    minLength={10}
                    pattern="[0-9]{9,10}"
                    name="phone"
                    id="phone"
                    placeholder=""
                    className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="phone"
                    className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transform -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
                  >
                    phone
                  </label>
                </div>
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
                <div className="relative">
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder=""
                    className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="email"
                    className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transform -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
                  >
                    Email
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="job"
                  className="mb-3 block text-base font-medium"
                >
                  อาชีพ
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="job"
                    id="job"
                    placeholder=""
                    className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={formData.job}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="job"
                    className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transform -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
                  >
                    อาชีพ
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="age"
                  className="mb-3 block text-base font-medium"
                >
                  วันเกิด
                </label>
                <div className="relative">
                  <input
                    required
                    type="date"
                    name="age"
                    id="age"
                    placeholder="วันเกิด"
                    className="peer w-64 h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={formData.age}
                    onChange={handleChange}
                  />
                  <label
                    for="age"
                    className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transform -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
                  >
                    วันเกิด
                  </label>
                </div>
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
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="username"
                    id="username"
                    placeholder=""
                    className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="username"
                    className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transform -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
                  >
                    Username
                  </label>
                </div>
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
                <div className="relative">
                  <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder=""
                    className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="password"
                    className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transform -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
                  >
                    Password
                  </label>
                </div>
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
                <div className="relative">
                  <input
                    required
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder=""
                    className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transform -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
                  >
                    Confirm-Password
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-8 bg-blue-700 text-white w-full max-w-lg mx-auto hover:bg-sky-400"
          >
            Sign Up
          </button>

          <div className="flex justify-center items-center mt-10 max-w-lg">
            <span className="w-44 border border-gray-400"></span>
            <span className="px-4 w-44 bg-white text-center">
              or sign up with
            </span>
            <span className="w-44 border border-gray-400"></span>
          </div>

          <button className="flex flex-wrap justify-center w-full max-w-lg mx-auto mt-10 border border-blue-700 text-blue-700 font-bold hover:border-gray-500 px-2 py-1.5 rounded-md">
            <img
              className="w-5 mr-2"
              src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            />
            Google
          </button>
        </form>
      </div>

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

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">เกิดข้อผิดพลาด!</h3>
          <p className="py-4">เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง!</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
