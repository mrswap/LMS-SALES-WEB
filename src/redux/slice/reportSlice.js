import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/axios";
import { getAuthConfig } from "../../utils/authConfig";

/* ===========================
   GET AUDIT LOGS
=========================== */
export const getAuditLogs = createAsyncThunk(
    "report/getAuditLogs",
    async (params, thunkAPI) => {
        try {
            const query = new URLSearchParams(params).toString();
            const res = await axiosInstance.get(`/trainee/reports/audit-logs?${query}`, getAuthConfig());
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch audit logs" }
            );
        }
    }
);

/* ===========================
   GET USER PROGRESS
=========================== */
export const getUserProgress = createAsyncThunk(
    "report/getUserProgress",
    async (params, thunkAPI) => {
        try {
            const query = new URLSearchParams(params).toString();
            const res = await axiosInstance.get(`/trainee/reports/user-progress?${query}`, getAuthConfig());
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch user progress" }
            );
        }
    }
);

/* ===========================
   GET ASSESSMENT REPORT
=========================== */
export const getAssessmentReport = createAsyncThunk(
    "report/getAssessmentReport",
    async (params, thunkAPI) => {
        try {
            const query = new URLSearchParams(params).toString();
            const res = await axiosInstance.get(`/trainee/reports/assessment-report?${query}`, getAuthConfig());
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch assessment report" }
            );
        }
    }
);


/* ===========================
   GET CERTIFICATIONS
=========================== */
export const getCertifications = createAsyncThunk(
    "report/getCertifications",
    async (params, thunkAPI) => {
        try {
            const query = new URLSearchParams(params).toString();
            const res = await axiosInstance.get(`/trainee/reports/certifications?${query}`, getAuthConfig());
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch certifications" }
            );
        }
    }
);

/* ===========================
   GET CERTIFICATE BY ID
=========================== */
export const getCertificateById = createAsyncThunk(
    "report/getCertificateById",
    async (certificateId, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/trainee/reports/certificate/${certificateId}`, getAuthConfig());
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch certificate" }
            );
        }
    }
);

/* ===========================
   SLICE
=========================== */
const reportSlice = createSlice({
    name: "report",
    initialState: {
        auditLogs: [],
        userProgress: null,
        assessmentReports: null,
        certifications: [],
        currentCertificate: null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },
    reducers: {
        resetReportState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearReportData: (state) => {
            state.auditLogs = [];
            state.userProgress = null;
            state.assessmentReport = null;
            state.certifications = [];
            state.currentCertificate = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* ===== GET AUDIT LOGS ===== */
            .addCase(getAuditLogs.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAuditLogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.auditLogs = action.payload;
                state.message = action.payload.message;
            })
            .addCase(getAuditLogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== GET USER PROGRESS ===== */
            .addCase(getUserProgress.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getUserProgress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userProgress = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(getUserProgress.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== GET ASSESSMENT REPORT ===== */
            .addCase(getAssessmentReport.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAssessmentReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.assessmentReports = action.payload?.data;
                state.message = action.payload.message;
            })
            .addCase(getAssessmentReport.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== GET CERTIFICATIONS ===== */
            .addCase(getCertifications.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getCertifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.certifications = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(getCertifications.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== GET CERTIFICATE BY ID ===== */
            .addCase(getCertificateById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getCertificateById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentCertificate = action.payload;
                state.message = action.payload.message;
            })
            .addCase(getCertificateById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            });
    },
});

export const { resetReportState, clearReportData } = reportSlice.actions;
export default reportSlice.reducer;