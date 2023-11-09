import React from 'react'
import BASE_URL from '../../service/baseURL'

export default function CommentReviewCar({ review }) {


  return (
    <>
    <div className='w-full border-b my-9'/>
        <div className='review_Container flex'>
            <img className='rounded-full h-12 w-12' src={`${BASE_URL}/api/v1/idledrive/images/${review.user.profileURL}`} alt='konror'/>

            <div className='mx-5'>
                <div className='text-lg font-bold text-black'>{review.user.username}</div>
            </div>

            <div className='mx-5'>
                <div className='flex'>
                    <StarRating rating={review.rating} />
                    <span className='text-base font-bold ml-5'>24-10-2023</span>
                </div>
                <div className='w-96'>{review.comment}</div>
            </div>
        </div>
    </>
  )
}

const StarRating = ({ rating }) => {
    const maxRating = 5;
  
    const stars = [];

    for (let i = 0; i < maxRating; i++) {
        stars.push(
          <box-icon
            key={i}
            name='star'
            type='solid'
            color={i < rating ? '#ffec00' : '#cccccc'}
            size='24px'
          >
            </box-icon>
        );
      }
  
    return <div className="star-rating">{stars}</div>;
};