import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import coursePreviewReducer from "./slice/coursePreviewSlice"
import profileReducer from "./slice/profileSlice"
import commonReducer from "./slice/commonSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        course: coursePreviewReducer,
        profile: profileReducer,
        common: commonReducer
    },
});