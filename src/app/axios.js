// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// const getDeviceId = () => {
//     let deviceId = localStorage.getItem("deviceId");

//     if (!deviceId) {
//         deviceId = uuidv4();
//         localStorage.setItem("deviceId", deviceId);
//     }

//     return deviceId; 
// };

// const axiosInstance = axios.create({
//     // baseURL: "https://lms-backend.netswaptech.com/api/v1",
//     baseURL: "https://backend.avantemedical.co.in/api/v1",
//     withCredentials: false,
// });

// // interceptor
// axiosInstance.interceptors.request.use((config) => {
//     config.headers["X-Device-Id"] = getDeviceId();
//     return config;
// });

// export default axiosInstance;

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Store ko dynamically access karne ke liye
let storeInstance = null;

// Store set karne ka function
export const setStore = (store) => {
    storeInstance = store;
    console.log("✅ Store instance set in axios");
};

const getDeviceId = () => {
    let deviceId = localStorage.getItem("deviceId");

    if (!deviceId) {
        deviceId = uuidv4();
        localStorage.setItem("deviceId", deviceId);
    }

    return deviceId;
};

const axiosInstance = axios.create({
    baseURL: "https://backend.avantemedical.co.in/api/v1",
    // baseURL: "https://lms-backend.netswaptech.com/api/v1",
    withCredentials: false,
});

// interceptor - X-Lang header add karo
axiosInstance.interceptors.request.use((config) => {
    config.headers["X-Device-Id"] = getDeviceId();

    // Redux state se language le kar X-Lang header mein add karo
    try {
        if (storeInstance) {
            const state = storeInstance.getState();
            const language = state.language?.lang || "en";
            config.headers["X-Lang"] = language;
            console.log("🌐 X-Lang header set to:", language);
        } else {
            // Fallback to localStorage
            const language = localStorage.getItem("appLanguage") || "en";
            config.headers["X-Lang"] = language;
            console.log("⚠️ Using localStorage X-Lang:", language);
        }
    } catch (error) {
        console.error("❌ Error setting X-Lang:", error);
        const language = localStorage.getItem("appLanguage") || "en";
        config.headers["X-Lang"] = language;
    }

    // Accept-Language ko hamesha "en" rakho
    config.headers["Accept-Language"] = "en";

    return config;
});

export default axiosInstance;