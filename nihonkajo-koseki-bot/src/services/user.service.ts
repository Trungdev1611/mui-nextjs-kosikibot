import { itemList } from '@/lib/HB/function/itemList';
import axios from 'axios';

const DATASTORE_ID = process.env.NEXT_PUBLIC_T_USER || '';
export const axiosInstance = axios.create({
    baseURL:'/api',
  });

export const getUserInfo = async (token?: any) => {
  try {
    const userToken = token || localStorage.get('token')
    const response = await axiosInstance.get(`/userInfo`, { headers: {
        Authorization: `Bearer ${userToken}`, 
      }, });

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const getListUser = async (body: any) => {
  try {
    const response = await itemList(DATASTORE_ID, body);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};