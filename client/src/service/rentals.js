import axios from "axios";
import BASE_URL from "./baseURL";

const BASE_URL_API = `${BASE_URL}/api/v1/idledrive`;

export const bookRental = async (bookingData) => {
  try {
    const response = await axios.post(`${BASE_URL_API}/booking`, bookingData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const listAllRentals = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/booking`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await axios.put(`${BASE_URL_API}/booking/${bookingId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBookingDetails = async (bookingId) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/booking/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBookingHistory = async (userID) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/booking/user/${userID}?limit=4`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBookingHistoryAll = async (userID) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/booking/user/${userID}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCarListAvailability = async(pickup, returnDate, location)=>{
  try {
    const response = await axios.get(`${BASE_URL_API}/list-availability?pickupDate=${pickup}&returnDate=${returnDate}&location=${location}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}