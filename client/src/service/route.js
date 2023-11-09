import axios from "axios";
import BASE_URL from "./baseURL";

const BASE_URL_API = `${BASE_URL}/api/v1/idledrive`;

export const getAllRoutes = async () => {
  try {
    const response = await axios.get(`${BASE_URL_API}/routes`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

  export const getDetailRoutes = async (routeID) => {
    try {
      const response = await axios.get(`${BASE_URL_API}/routes/${routeID}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const addRoutes = async (userID, routeData) => {
    try {
      const response = await axios.post(
        `${BASE_URL_API}/users/routes/${userID}`,
        routeData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
