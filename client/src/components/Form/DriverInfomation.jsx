import React, { useEffect, useState } from "react";
import { getDriverInformation } from "../../service/users";

export default function DriverInfomationhtmlForm({
  form,
  handleChange,
  setForm,
  userID,
  driverDoc,
  setDriverDoc
}) {
  const [previewImage, setPreviewImage] = useState({
    idcardFile: null,
    licenseFile: null,
  });

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    const file = files[0];

    if (!file.type.startsWith("image/")) {
      console.error("Invalid file type. Please select an image.");
      document.getElementById("my_modal_1").showModal();
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      console.error("File size exceeds 5MB limit.");
      document.getElementById("my_modal_2").showModal();
      return;
    }

    setForm((prevData) => ({
      ...prevData,
      [id]: file,
    }));

    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImageSrc = e.target.result;
      setPreviewImage((prevImages) => ({
        ...prevImages,
        [id]: previewImageSrc,
      }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchDetailUser = async () => {
      const res = await getDriverInformation(userID);
      console.log(res);
      setDriverDoc(res.driverDocuments);

      setForm((prevData) => ({
        ...prevData,
        fname: res?.user?.FirstName || "",
        lname: res?.user?.LastName || "",
        email: res?.user?.email || "",
        phone: res?.user?.phone || "",
        idcardFile: null,
        licenseFile: null,
      }));
    };

    fetchDetailUser();
  }, [userID]);

  return (
    <>
      <p className="ml-5 text-bold">
        ข้อมูลผู้ขับขี่
        <span className="text-gray-400">
          {" "}
          ( ชื่อผู้ขับขี่ต้องเป็นชื่อเดียวกับผู้มารับรถ ){" "}
        </span>
      </p>
      <div className="my-5 flex flex-col gap-4 mx-10">
        <div className="relative">
          <input
            value={form.fname}
            onChange={handleChange}
            type="text"
            required
            id="fname"
            placeholder=""
            className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          <label
            htmlFor="fname"
            className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transhtmlForm -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
          >
            ชื่อจริง<span className="text-red-500"> *</span>
          </label>
        </div>

        <div className="relative">
          <input
            value={form.lname}
            onChange={handleChange}
            type="text"
            required
            id="lname"
            placeholder=""
            className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          <label
            htmlFor="lname"
            className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transhtmlForm -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
          >
            นามสกุล<span className="text-red-500"> *</span>
          </label>
        </div>

        <div className="relative">
          <input
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            id="email"
            placeholder=""
            className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          <label
            htmlFor="email"
            className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transhtmlForm -translate-y-5 scale-75 bg-white top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
          >
            อีเมล (ในการติดต่อขอเอกสาร)<span className="text-red-500"> *</span>
          </label>
        </div>

        <div className="relative">
          <input
            value={form.phone}
            onChange={handleChange}
            type="text"
            required
            id="phone"
            placeholder=""
            minLength={10}
            maxLength={10}
            className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          <label
            htmlFor="phone"
            className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transhtmlForm -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
          >
            หมายเลขโทรศัพท์<span className="text-red-500"> *</span>
          </label>
        </div>

        <div className="relative">
          {/* <input
            value={form.location}
            onChange={handleChange}
            type="text"
            required
            id="location"
            placeholder=""
            className="peer w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          /> */}
          <label
            htmlFor="location"
            className="absolute font-medium text-base py-2 px-4 opacity-75 text-[#6B7280] duration-300 transhtmlForm -translate-y-5 scale-75 bg-white  top-0 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:bg-opacity-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:text-sm peer-focus:bg-white peer-focus:opacity-100"
          >
            สถานที่ที่ต้องการรับรถ<span className="text-red-500"> *</span>
          </label>
          <select 
            value={form.location}
            onChange={handleChange}
            id="location"
            required className="peer w-full h-15 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
              <option value='' disabled selected>สถานที่</option>
              <option value="ท่าอากาศยานเชียงใหม่">ท่าอากาศยานเชียงใหม่</option>
              <option value="ประตูท่าแพ">ประตูท่าแพ</option>
              <option value="มหาวิทยาลัยเชียงใหม่">มหาวิทยาลัยเชียงใหม่</option>
              <option value="MAYA เมย่า">MAYA เมย่า</option>
              <option value="เซ็นทรัลเชียงใหม่ แอร์พอร์ต">เซ็นทรัลเชียงใหม่ แอร์พอร์ต</option>
          </select>
        </div>

        <div className="-mx-3 flex flex-wrap">
          {driverDoc && driverDoc.length > 0 ? null : (
            <>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="idcard"
                    className=" block text-base font-medium text-gray-500"
                  >
                    ภาพถ่ายสำเนาบัตรประชาชน
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="file"
                    required
                    onChange={handleFileChange}
                    id="idcardFile"
                    className="file-input file-input-bordered w-full h-10 max-w-xs border-[#D9D9D9] file:text-gray-600 file:rounded-lg file:border-blue-700 file:border-opacity-50 file:hover:bg-blue-700 hover:border-blue-700 file:hover:text-white focus:outline-none cursor-pointer"
                  />
                  {previewImage.idcardFile && (
                    <img
                      src={previewImage.idcardFile}
                      alt="ID Card Preview"
                      className="mt-2 rounded-md shadow-md"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="license"
                    className=" block text-base font-medium text-gray-500"
                  >
                    ภาพถ่ายสำเนาใบขับขี่<span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="file"
                    required
                    id="licenseFile"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full h-10 max-w-xs border-[#D9D9D9] file:text-gray-600 file:rounded-lg file:border-blue-700 file:border-opacity-50 file:hover:bg-blue-700 hover:border-blue-700 file:hover:text-white focus:outline-none cursor-pointer"
                  />
                  {previewImage.licenseFile && (
                    <img
                      src={previewImage.licenseFile}
                      alt="License Preview"
                      className="mt-2 rounded-md shadow-md"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">เกิดข้อผิดพลาด!</h3>
          <p className="py-4">
            ประเภทไฟล์ไม่ถูกต้อง กรุณาเลือกรูปภาพใหม่อีกครั้ง
          </p>
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
          <p className="py-4">ขนาดไฟล์เกินขีดจำกัด 5MB</p>
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
