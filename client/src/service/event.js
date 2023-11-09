import axios from "axios";
import BASE_URL from "./baseURL";

const BASE_URL_API = `${BASE_URL}/api/v1/idledrive`;

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/events`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailEvents = async (eventID) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/events/${eventID}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};