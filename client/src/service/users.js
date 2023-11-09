import axios from "axios";
import BASE_URL from "./baseURL";

const BASE_URL_API = `${BASE_URL}/api/v1/idledrive/users`;

//Service สำหรับ get user by id
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Service สำหรับสร้าง  user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL_API}`, userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${BASE_URL_API}/auth/login`,credentials);
    return response;
};

//Service สำหรับแก้ไข user
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${BASE_URL_API}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Service สำหรับลบ user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL_API}/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDriverInformation = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL_API}/driver/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDriverInformation = async (userId,formData) => {
  try {
    const response = await axios.put(`${BASE_URL_API}/driver/${userId}`,formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDriverDocument = async (userId,formData) => {
  try {
    const response = await axios.put(`${BASE_URL_API}/driver/document/${userId}`,formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Service สำหรับสร้าง driver doc
export const createDriverDocument = async (userId, documentData) => {
  try {
    const response = await axios.post(
      `${BASE_URL_API}/${userId}/driver-documents`,
      documentData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
