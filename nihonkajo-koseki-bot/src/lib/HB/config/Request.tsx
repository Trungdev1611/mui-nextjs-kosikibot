import axios from "axios"
import { cookies } from "next/headers"
import { SYSTEM_DATA } from "@/utils/system"


const axiosInstance = axios.create({
    baseURL: typeof window === 'undefined' ? SYSTEM_DATA.baseUrl : ''
})

axiosInstance.interceptors.request.use(async (config) => {
    if (typeof window === 'undefined') {
        const cookieStore = await cookies()
        const token = cookieStore.get('o_token')?.value || '';
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config
},
    (error) => {
        return Promise.reject(error)
    },
)

axiosInstance.interceptors.response.use((response => {
    return response
}),
    (error) => {
        return Promise.reject(error)
    })

type ObjectParams = Record<string, string | number | undefined> | object | unknown

export const apiBase = {
    get: (url: string,  query?: ObjectParams) => {
        return axiosInstance.get(url, { params: query })
    },
    post: function <T>(url: string, dataSubmit: T) {
        return axiosInstance.post(url, dataSubmit)
    },
    patch: function <T>(url: string, dataSubmit: T) {
        return    axiosInstance.patch(url, dataSubmit)
    },
    delete: function <T>(url: string, dataSubmit?: T) {
        if (dataSubmit) {
          return axiosInstance.delete(url, { data: dataSubmit })
        } else {
          return axiosInstance.delete(url)
        }
      },
     
    }