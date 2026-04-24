import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: "https://lms-backend.netswaptech.com/api/v1",
//     withCredentials: false,
// });
const axiosInstance = axios.create({
    baseURL: "/api",
});

export default axiosInstance;

