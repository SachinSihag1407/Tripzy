import axios from 'axios'

base=import.meta.env.VITE_BASE_URL||"";

const axiosInstance = axiosInstance.create({
    baseUrl:`${base}/api`,
    withCredentials:true
})