import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const getDeviceId = () => {
    let deviceId = localStorage.getItem("deviceId");

    if (!deviceId) {
        deviceId = uuidv4();
        localStorage.setItem("deviceId", deviceId);
    }

    return deviceId;
};

const axiosInstance = axios.create({
    // baseURL: "https://lms-backend.netswaptech.com/api/v1",
    baseURL: "https://backend.avantemedical.co.in/api/v1",
    withCredentials: false,
});

// interceptor
axiosInstance.interceptors.request.use((config) => {
    config.headers["X-Device-Id"] = getDeviceId();
    return config;
});

export default axiosInstance;