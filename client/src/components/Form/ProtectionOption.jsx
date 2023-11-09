import React from 'react'

export default function ProtectionOption({ title, setIsCheck, isCheck }) {

    let content = '';
    const carType = title;
    console.log(carType + '============')

    if (carType === 'campercar' || carType === 'Campervan' || carType === 'Campercar') {
        content = (
          <div className=''>
            <div className='flex mt-2'>
                <div className='h-12 w-12 min-w-[48px]  rounded-md  bg-gray-100 flex items-center justify-center'>
                    <img className='w-8 h-5'
                    src='https://thaiembdc.org/wp-content/uploads/2023/01/%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%8A%E0%B8%99.png' alt='bpcc'/>
                </div>
                <div className='ml-3'>
                    <h3 className='font-bold'>บัตรประจำตัวประชาชน หรือ หนังสือเดินทาง</h3>
                    <li>บัตรยังไม่หมดอายุ</li>
                    <li>มีอายุไม่น้อยกว่า 21 ปี</li>
                </div>
            </div>
            <div className='flex mt-2'>
                <div className='h-12 w-12 min-w-[48px]  rounded-md  bg-gray-100 flex items-center justify-center'>
                    <img className='w-8 h-5'
                    src='https://www.ktc.co.th/pub/media/Article/03/driving-license.webp' alt='bpcc'/>
                </div>
                <div className='ml-3'>
                    <h3 className='font-bold'>ใบขับขี่ หรือใบขับขี่สากล</h3>
                    <li>บัตรยังไม่หมดอายุ</li>
                    <li>มีอายุไม่น้อยกว่า 21 ปี</li>
                    <li>บัตรต้องใช้งานมาแล้ว อย่างน้อย 1 ปีขึ้นไป</li>
                </div>
            </div>
          </div>
        );
      } else if (carType === 'Motorhome') {
        content = (
            <div className=''>
            <div className='flex mt-2'>
                <div className='h-12 w-12 min-w-[48px]  rounded-md  bg-gray-100 flex items-center justify-center'>
                    <img className='w-8 h-5'
                    src='https://thaiembdc.org/wp-content/uploads/2023/01/%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%8A%E0%B8%99.png' alt='bpcc'/>
                </div>
                <div className='ml-3'>
                    <h3 className='font-bold'>บัตรประจำตัวประชาชน หรือ หนังสือเดินทาง</h3>
                    <li>บัตรยังไม่หมดอายุ</li>
                    <li>มีอายุไม่น้อยกว่า 21 ปี</li>
                </div>
            </div>
            <div className='flex mt-2'>
                <div className='h-12 w-12 min-w-[48px]  rounded-md  bg-gray-100 flex items-center justify-center'>
                    <img className='w-8 h-5'
                    src='https://www.ktc.co.th/pub/media/Article/03/driving-license.webp' alt='bpcc'/>
                </div>
                <div className='ml-3'>
                    <h3 className='font-bold'>ใบขับขี่ประเภท 2</h3>
                    <li>บัตรยังไม่หมดอายุ</li>
                    <li>มีสัญชาติไทย</li>
                    <li>บัตรต้องใช้งานมาแล้ว อย่างน้อย 1 ปีขึ้นไป</li>
                </div>
            </div>
          </div>
        );
      } else if (carType === 'Caravan') {
        content = (
            <div className=''>
            <div className='flex mt-2'>
                <div className='h-12 w-12 min-w-[48px]  rounded-md  bg-gray-100 flex items-center justify-center'>
                    <img className='w-8 h-5'
                    src='https://thaiembdc.org/wp-content/uploads/2023/01/%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%8A%E0%B8%99.png' alt='bpcc'/>
                </div>
                <div className='ml-3'>
                    <h3 className='font-bold'>บัตรประจำตัวประชาชน หรือ หนังสือเดินทาง</h3>
                    <li>บัตรยังไม่หมดอายุ</li>
                    <li>มีอายุไม่น้อยกว่า 21 ปี</li>
                </div>
            </div>
            <div className='flex mt-2'>
                <div className='h-12 w-12 min-w-[48px]  rounded-md  bg-gray-100 flex items-center justify-center'>
                    <img className='w-8 h-5'
                    src='https://www.ktc.co.th/pub/media/Article/03/driving-license.webp' alt='bpcc'/>
                </div>
                <div className='ml-3'>
                    <h3 className='font-bold'>ใบขับขี่ หรือใบขับขี่สากล</h3>
                    <li>บัตรยังไม่หมดอายุ</li>
                    <li>มีอายุไม่น้อยกว่า 21 ปี</li>
                    <li>บัตรต้องใช้งานมาแล้ว อย่างน้อย 1 ปีขึ้นไป</li>
                </div>
            </div>
            <div className='flex mt-2'>
                <div className='h-12 w-12 min-w-[48px]  rounded-md  bg-gray-100 flex items-center justify-center'>
                    <img className='w-8 h-5'
                    src='https://pbs.twimg.com/media/CBinZuEVEAAYwWr.png' alt='bpcc'/>
                </div>
                <div className='ml-3'>
                    <h3 className='font-bold'>รถยนต์ที่ใช้ลาก</h3>
                    <li>ต้อง 200 cc ขึ้นไป</li>
                </div>
            </div>
          </div>
        );
      } else {
        content = <p>ประเภทใบขับขี่ไม่ระบุ</p>;
      }



  return (
    <>
        <div className='ml-5 my-5'>
            <div className='my-5'>
                {content}
            </div>

            <div className="htmlForm-control">
                <label className="label cursor-pointer justify-start">
                <input type="checkbox" required className="checkbox-md "
                  checked={isCheck}
                  onChange={(e) => setIsCheck(e.target.checked)}
                   />
                <span className="label-text pl-5">
                    ยืนยันว่าข้าพเจ้ารับทราบแล้ว{" "}
                    <span className="text-red-600">*</span>
                </span>
                </label>
            </div>
        </div>
    </>
  )
}
