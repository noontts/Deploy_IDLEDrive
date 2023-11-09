import axios from "axios";
import BASE_URL from "./baseURL";

const BASE_URL_API = `${BASE_URL}/api/v1/idledrive`;

export const getCarReviews = async (carId) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/review/${carId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCarReview = async (carId, reviewData) => {
  try {
    const response = await axios.post(
      `${BASE_URL_API}/review/${carId}`,
      reviewData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const setRentalReview = async (rentalID, reviewData) => {
  try {
    const response = await axios.put(
      `${BASE_URL_API}/booking/review/${rentalID}`,
      reviewData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};