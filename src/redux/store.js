import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import coursePreviewReducer from "./slice/coursePreviewSlice"
import profileReducer from "./slice/profileSlice"
import commonReducer from "./slice/commonSlice"
import quizReducer from "./slice/quizSlice"
import languageReducer from "./slice/languageSlice"
import reportReducer from "./slice/reportSlice"
import dashboardReducer from "./slice/dashboardSlice"
import notificationsReducer from "./slice/notificationSlicer"
import supportReducer from "./slice/supportSlice"
import moduleCertificationReducer from "./slice/moduleLearningStatusSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        course: coursePreviewReducer,
        profile: profileReducer,
        common: commonReducer,
        quiz: quizReducer,
        language: languageReducer,
        report: reportReducer,
        dashboard: dashboardReducer,
        notification: notificationsReducer,
        support: supportReducer,
        moduleCertification: moduleCertificationReducer,
    },
});