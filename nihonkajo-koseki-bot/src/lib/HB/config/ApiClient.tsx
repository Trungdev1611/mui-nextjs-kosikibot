import axios, { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';

export const APIClient = (): AxiosInstance => {
    const o_token: any =  getCookie('o_token')
    const o_tokenObject = JSON.parse(o_token);
    const token = o_tokenObject?.token || ''
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_API,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};
