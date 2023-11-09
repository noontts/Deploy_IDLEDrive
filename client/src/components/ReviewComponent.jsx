import React ,{ useContext, useState } from "react";
import { AuthContext } from "../service/context/AuthContext";
import { createCarReview, setRentalReview } from "../service/reviews";
import { useNavigate } from "react-router-dom";

export default function ReviewComponent({ carID, RentalID }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [count, setCount] = React.useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async() => {
    const reviewData = {
      user_id : user.id, 
      rating : rating, 
      comment : comment
    }
    const review = {
      review : true,
    }
    const res = await createCarReview(carID, reviewData);
    const resRental = await setRentalReview(RentalID, review);
    navigate('/history');
    
  };

  return (
    <>
      <div className="my-10 w-full flex flex-col items-center">

        <div className="w-1/2 mx-10 my-5 drop-shadow-xl shadow-xl rounded-xl p-10 border-[#D9D9D9] border-2 flex flex-col items-center">
          <div className=" flex flex-col gap-4 w-full">
          <div className="text-3xl font-bold text-blue-700 m-2 text-center">Review</div>
          <div className="flex justify-between">
            <div className="rating">
            {[1, 2, 3, 4, 5].map((value) => (
                <input
                  key={value}
                  type="radio"
                  name="rating"
                  value={value}
                  className="mask mask-star-2 bg-orange-400"
                  onChange={handleRatingChange}
                />
              ))}
            </div> 
                <p className="text-right font-bold text-blue-800">{count} / 200</p>
            </div>
            <div className="form-control w-full">
              <textarea onChange={(e)=>{
                setCount(e.target.value.length)
                handleCommentChange(e);
              }} type='text' className="textarea textarea-bordered h-24 focus:outline-none shadow-md  border-[#D9D9D9] focus:border-blue-700 focus:border-2" placeholder="ข้อความ" maxlength="200"></textarea>
            </div>
            <button 
            onClick={handleSubmit}
            className="btn text-white bg-blue-700 hover:bg-blue-600 shadow-xl drop-shadow-lg border-[#D9D9D9] hover:border-[#D9D9D9]">Comment</button>
          </div>
        </div>
      </div>
    </>
  );
}
