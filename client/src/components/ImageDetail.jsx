import { useState } from 'react';
import BASE_URL from '../service/baseURL';

function ImageDetailShow({ imgList }) {
  const [image, setImage] = useState(1);
  const imgURL = `${BASE_URL}/api/v1/idledrive/images/`;

  return (
    <div>
      <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
        {imgList && Array.isArray(imgList) && imgList.length > 0 && imgList.map((imageData, i) => (
          <div key={i} style={{ display: image === i + 1 ? 'flex' : 'none' }} className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
            <img src={`${imgURL}${imageData.imageURL}`} alt={`Image ${i + 1}`} className="max-w-full max-h-full" />
          </div>
        ))}
      </div>

      <div className={`flex -mx-2 mb-4 items-center justify-center ${imgList.length > 3 ? 'min-[300px]:flex-wrap' : ''}`}>
        {imgList && Array.isArray(imgList) && imgList.length > 0 && imgList.map((imageData, i) => (
          <div key={i} className="p-2 w-1/3">
            <button
              onClick={() => setImage(i + 1)}
              className={`focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center ${image === i + 1 ? 'ring-2 ring-indigo-300 ring-inset' : ''}`}
            >
              <img src={`${imgURL}${imageData.imageURL}`} alt={`Image ${i + 1}`} className="max-w-full max-h-full" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageDetailShow;
