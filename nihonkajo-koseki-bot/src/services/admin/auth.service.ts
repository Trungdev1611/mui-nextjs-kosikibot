import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:'/api/admin/auth',
  });

export const login = async (body: any) => {
  try {
    const {user_code, password} = body;
    const response = await axiosInstance.post(`/login`, { user_code, password });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
