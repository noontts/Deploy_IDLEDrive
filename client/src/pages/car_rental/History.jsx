import React, { useContext, useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../service/context/AuthContext';
import { getHistoryTransaction } from '../../service/cars_rental';
import Transaction_BackOff from '../../components/Card/transactionList_BackOffice';

export const History = () => {
  const { user } = useContext(AuthContext);
  const [historyOrder, setHistoryOrder] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const handleSortByType = (type) => {
    handleTypeChange(type);
  };
  const handleTypeChange = (type) => {
    setSelectedType(type);
  };
  const filterCarsByType = (historyOrder) => {
    if (!selectedType) {
      return historyOrder;
    }
    return historyOrder.filter((historyOrder) => historyOrder.rental.RentalStatus === selectedType);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getHistoryTransaction(user.id_rental);
      const filteredCars = filterCarsByType(res);
      setHistoryOrder(filteredCars);
    };
    fetchHistory();
  },[user.id_rental, selectedType])

  return (
    <>
      <div className='flex justify-around my-10 flex-col'>
        <div className='text-center font-bold text-5xl mt-30 text-primary'>รายการทั้งหมด</div>
        <details className="dropdown ml-10">
            <summary className="btn border-2 border-[#D9D9D9] shadow-md font-normal text-base bg-white hover:text-white hover:bg-blue-700">
              ประเภท
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52 border-[#D9D9D9] border-2">
              <li>
                <a onClick={() => handleSortByType(null)} className='hover:bg-blue-700 hover:text-white'>All</a>
              </li>
              <li>
                <a onClick={() => handleSortByType("Wait for Confirm")} className='hover:bg-blue-700 hover:text-white'>Wait for Confirm</a>
              </li>
              <li>
                <a onClick={() => handleSortByType("Confirm order")} className='hover:bg-blue-700 hover:text-white'>Confirm order</a>
              </li>
              <li>
                <a onClick={() => handleSortByType("On-delivery")} className='hover:bg-blue-700 hover:text-white'>On-delivery</a>
              </li>
              <li>
                <a onClick={() => handleSortByType("Pick-up")} className='hover:bg-blue-700 hover:text-white'>Pick-up</a>
              </li>
              <li>
                <a onClick={() => handleSortByType("During the rental")} className='hover:bg-blue-700 hover:text-white'>During the rental</a>
              </li>
              <li>
                <a onClick={() => handleSortByType("Complete")} className='hover:bg-blue-700 hover:text-white'>Complete</a>
              </li>
              <li>
                <a onClick={() => handleSortByType("Cancel")} className='hover:bg-error hover:text-white'>Cancel</a>
              </li>
            </ul>
          </details>
      </div>

      <div className="w-3/4 flex flex-col mx-auto my-4">
        {historyOrder && historyOrder.map((order, index)=>(
              <Transaction_BackOff key={index} rentData={order}/>
          ))}  
      </div>
            
         
    </>
  );
};