import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailCar, updateCar } from "../../service/cars";
import BASE_URL from "../../service/baseURL";
export const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);
  const [carData, setCarData] = useState();
  const [carDetails, setCarDetails] = useState({
    model: "",
    make: "",
    color: "",
    fuel_type: "",
    seat: "",
    plate: "",
    transmission: "",
    description: "",
    feature: "",
    rentalRate: "",
    car_rental_id_rental: "",
    status: "",
    type: "",
    location: "",
  });
  const [confirmCar, setConfirmCar] = useState(true);
  const [agreement, setAgreement] = useState(true);

  const handleConfirmCarChange = () => {
    setConfirmCar(!confirmCar);
  };

  const handleAgreementChange = () => {
    setAgreement(!agreement);
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        console.log("car id " + id);
        const carData = await getDetailCar(id);
        setCarDetails(carData.car);
        setIsChecked(carData.car.status);
        setCarData(carData);
        console.log(carData);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setCarDetails({
      ...carDetails,
      status: !isChecked,
    });
  };

  const handleFileUpload = (
    e,
    fileState,
    setFileState,
    setFileUpload,
    maxSizeMB
  ) => {
    const files = e.target.files;

    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const isImage = files[i].type.split("/")[0] === "image";

      const isFileExist = fileState.some((e) => e.name === files[i].name);
      const isSizeValid = files[i].size <= maxSizeMB * 1024 * 1024;

      if (isImage && !isFileExist && isSizeValid) {
        const fileUrl = URL.createObjectURL(files[i]);
        setFileState((prevFiles) => [
          ...prevFiles,
          {
            name: files[i].name,
            url: fileUrl,
          },
        ]);

        setFileUpload((prevFile) => [...prevFile, files[i]]);
      }
    }
  };

  const handleImageUpload = (e) => {
    handleFileUpload(e, carImages, setCarImages, setCarFileImages, 6);
  };

  const handleDocumentUpload = (e) => {
    handleFileUpload(
      e,
      documentImages,
      setDocumentImages,
      setDocumentFileImages,
      6
    );
  };

  const deleteCarImg = (index) => {
    URL.revokeObjectURL(carImages[index].url);
    setCarImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setCarFileImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const deleteDocumentImg = (index) => {
    URL.revokeObjectURL(documentImages[index].url);
    setDocumentImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setDocumentFileImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const [carImages, setCarImages] = useState([]);
  const [carFileImages, setCarFileImages] = useState([]);
  const [documentImages, setDocumentImages] = useState([]);
  const [documentFileImages, setDocumentFileImages] = useState([]);

  const handleSubmit = async () => {
    if (carFileImages.length !== 6 && carFileImages.length >= 1) {
      console.error("Please upload exactly 6 car images.");
      document.getElementById("my_modal_1").showModal();
      return;
    }

    const requiredFields = [
      "model",
      "make",
      "color",
      "fuel_type",
      "seat",
      "plate",
      "transmission",
      "description",
      "feature",
      "rentalRate",
      "car_rental_id_rental",
      "type",
      "location",
    ];
    const missingFields = requiredFields.filter((field) => !carDetails[field]);

    if (missingFields.length > 0) {
      document.getElementById("my_modal_2").showModal();
      return;
    }

    if (!confirmCar || !agreement) {
      document.getElementById("my_modal_3").showModal();
      return;
    }

    const formData = new FormData();
    formData.append("carDetails", JSON.stringify(carDetails));

    carFileImages.forEach((file) => {
      formData.append("carImages", file);
    });

    documentFileImages.forEach((file) => {
      formData.append("documentImages", file);
    });

    console.log("Updated car details:", formData);
    try {
      const response = await updateCar(id, formData);
      console.log("Car updated successfully:", response);
      navigate("/merchant/mycar");
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  return (
    <>
      <div className="text-center text-4xl font-bold text-blue-700 my-10">
        แก้ไขข้อมูลรถของท่าน
      </div>
      <div className="w-11/12 mx-auto">
        <div className="w-full flex flex-wrap rounded-xl shadow-xl drop-shadow-xl p-10 border-2 border-[#D9D9D9]">
          <form className="flex w-1/2 flex-wrap justify-around p-5">
            <div className="mb-5">
              <label
                htmlFor="model"
                className="mb-3 block text-base font-medium"
              >
                ชื่อรุ่นและปี
              </label>
              <input
                required
                type="text"
                name="model"
                id="model"
                placeholder="ชื่อรุ่นและปี"
                value={carDetails.model}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="make"
                className="mb-3 block text-base font-medium"
              >
                ยี่ห้อ
              </label>
              <input
                required
                type="text"
                name="make"
                id="make"
                placeholder="ยี่ห้อ"
                value={carDetails.make}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="color"
                className="mb-3 block text-base font-medium"
              >
                สี
              </label>
              <input
                required
                type="text"
                name="color"
                id="color"
                placeholder="สี"
                value={carDetails.color}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="fuel_type"
                className="mb-3 block text-base font-medium"
              >
                เชื้อเพลิง
              </label>
              <input
                required
                type="text"
                name="fuel_type"
                id="fuel_type"
                placeholder="เชื้อเพลิง"
                value={carDetails.fuel_type}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="seat"
                className="mb-3 block text-base font-medium"
              >
                จำนวนที่นั่ง
              </label>
              <input
                required
                type="text"
                name="seat"
                id="seat"
                placeholder="จำนวนที่นั่ง"
                value={carDetails.seat}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="transmission"
                className="mb-3 block text-base font-medium"
              >
                ประเภทเกียร์
              </label>
              <input
                required
                type="text"
                name="transmission"
                id="transmission"
                placeholder="ประเภทเกียร์"
                value={carDetails.transmission}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="rentalRate"
                className="mb-3 block text-base font-medium"
              >
                ราคา
              </label>
              <input
                required
                type="number"
                name="rentalRate"
                id="rentalRate"
                placeholder="ราคา"
                value={carDetails.rentalRate}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="location"
                className="mb-3 block text-base font-medium"
              >
                ที่ตั้ง
              </label>
              <input
                required
                type="text"
                name="location"
                id="location"
                placeholder="ที่ตั้ง"
                value={carDetails.location}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 w-5/12">
              <label
                htmlFor="type"
                className="mb-3 block text-base font-medium"
              >
                ประเภทรถ
              </label>
              <select
                required
                name="type"
                value={carDetails.type}
                onChange={handleChange}
                className="select select-sm w-full h-10 rounded-md border border-[#D9D9D9] bg-white px-6 text-base font-medium text-[#6B7280] outline-none focus:outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option disabled value={""}>
                  ประเภทรถ
                </option>
                <option value={"Campercar"}>Campercar</option>
                <option value={"Campervan"}>Campervan</option>
                <option value={"Caravan"}>Caravan</option>
                <option value={"Motorhome"}>Motorhome</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="plate"
                className="mb-3 block text-base font-medium"
              >
                ป้ายทะเบียน
              </label>
              <input
                required
                type="text"
                name="plate"
                id="plate"
                placeholder="ป้ายทะเบียน"
                value={carDetails.plate}
                onChange={handleChange}
                className="w-full h-10 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 w-11/12">
              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium"
              >
                คำอธิบาย
              </label>
              <textarea
                required
                type="text"
                name="description"
                id="description"
                placeholder="คำอธิบาย"
                value={carDetails.description}
                onChange={handleChange}
                className="w-full h-36 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-5 w-11/12">
              <label
                htmlFor="feature"
                className="mb-3 block text-base font-medium"
              >
                Car features
              </label>
              <textarea
                required
                type="text"
                name="feature"
                id="feature"
                placeholder="Car features"
                value={carDetails.feature}
                onChange={handleChange}
                className="w-full h-36 rounded-md border border-[#D9D9D9] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </form>
          <div className="flex w-1/2 flex-wrap justify-around p-10">
            <div className="w-full">
              <label
                htmlFor="Features"
                className="mb-3 block text-base font-medium"
              >
                รูป : รอบคัน - ภายใน
              </label>

              <input
                className="file-input border-[#D9D9D9] file:rounded-lg file:border-blue-700 file:hover:bg-blue-700 hover:border-blue-700 file:hover:text-white focus:outline-none "
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                multiple
              />

              <div className="flex flex-wrap justify-start mt-6">
                {carImages.length === 0 &&
                  carData &&
                  carData.listImage &&
                  carData.listImage.map((images, index) => (
                    <div key={index} className="relative mr-6 mt-3">
                      <img
                        className="h-36 w-36 rounded-xl"
                        src={`${BASE_URL}/api/v1/idledrive/images/${images.imageURL}`}
                        alt="Uploaded"
                      />
                    </div>
                  ))}

                {carImages.map((images, index) => (
                  <div key={index} className="relative mr-6 mt-3">
                    <span
                      className="absolute top-0 right-0
                    hover:cursor-pointer"
                      onClick={() => deleteCarImg(index)}
                    >
                      <box-icon name="x" size="md" color="red"></box-icon>
                    </span>
                    <img
                      className="h-36 w-36 rounded-xl"
                      src={images.url}
                      alt="Uploaded"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="Features"
                className="mb-3 block text-base font-medium"
              >
                รูป : เอกสารของรถ
              </label>

              <input
                className="file-input border-[#D9D9D9] file:rounded-lg file:border-blue-700 file:hover:bg-blue-700 hover:border-blue-700 file:hover:text-white focus:outline-none "
                type="file"
                accept="image/*"
                onChange={handleDocumentUpload}
                multiple
              />

              <div className="flex flex-wrap justify-start mt-6">
                {documentImages.length === 0 &&
                  carData &&
                  carData.documentImage &&
                  carData.documentImage.map((images, index) => (
                    <div key={index} className="relative mr-6 mt-3">
                      <img
                        className="h-36 w-36 rounded-xl"
                        src={`${BASE_URL}/api/v1/idledrive/images/${images.ImageURL}`}
                        alt="Uploaded"
                      />
                    </div>
                  ))}

                {documentImages.map((images, index) => (
                  <div key={index} className="relative mr-6 mt-3">
                    <span
                      className="absolute top-0 right-0
                    hover:cursor-pointer"
                      onClick={() => deleteDocumentImg(index)}
                    >
                      <box-icon name="x" size="md" color="red"></box-icon>
                    </span>
                    <img
                      className="h-36 w-36 rounded-xl"
                      src={images.url}
                      alt="Uploaded"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 w-full flex flex-col">
              <p className="font-bold text-sm ">เปิด-ปิด ให้เช่ารถ</p>
              <input
                type="checkbox"
                className="toggle toggle-lg toggle-success mt-3"
                onChange={handleCheckboxChange}
                checked={isChecked}
              />
              <div className="mt-3">
                <ul className="list-disc ml-5">
                  <li className="text-gray-500">
                    <span className="text-success">สีเขียว</span> ={" "}
                    <span className="text-success underline">เปิด</span>
                    ให้บริการ
                  </li>
                  <li className="text-gray-500">
                    สีเทา = <span className="text-red-500 underline">ปิด</span>
                    ให้บริการ
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-around">
            <div className="flex flex-col w-1/3 p-10">
              <div className="htmlForm-control">
                <label className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    className="checkbox-md "
                    id="confirmCar"
                    checked={confirmCar}
                    onChange={handleConfirmCarChange}
                  />
                  <span className="label-text pl-5">
                    ยืนยันว่าข้าพเจ้าเป็นเจ้าของรถ{" "}
                    <span className="text-red-600">*</span>
                  </span>
                </label>
              </div>
              <div className="htmlForm-control">
                <label className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    className="checkbox-md "
                    id="agreement"
                    checked={agreement}
                    onChange={handleAgreementChange}
                  />
                  <span className="label-text pl-5">
                    ยืนยันข้อตกลงของทางเรา{" "}
                    <span className="text-red-600">*</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="w-1/3 flex justify-center items-end">
              <button
                onClick={handleSubmit}
                className="btn bg-blue-700 hover:bg-blue-800 rounded-full h-10 w-48 border-[#D9D9D9] shadow-lg drop-shadow-lg
                 text-white"
              >
                ยืนยันการส่งข้อมูล
              </button>
            </div>
            <div className="w-1/3"></div>
          </div>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">เกิดข้อผิดพลาด!</h3>
          <p className="py-4">กรูณาอัพโหลดรูปให้ครบ 6 ภาพ หรือ ใช้รูปเดิม</p>
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
          <p className="py-4">กรูณาใส่ข้อมูลให้ครบทุกช่อง !</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">เกิดข้อผิดพลาด!</h3>
          <p className="py-4">กรูณายอมรับข้อตกลง !</p>
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
