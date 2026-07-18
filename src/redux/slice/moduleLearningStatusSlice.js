import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/axios";
import { getAuthConfig } from "../../utils/authConfig";

/* ===========================
   GET MODULE CERTIFICATION STATUS
=========================== */
export const fetchModuleCertificationStatus = createAsyncThunk(
    "moduleCertification/fetchModuleCertificationStatus",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                "/trainee/reports/module-learning-status",
                getAuthConfig()
            );

            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || {
                    message: "Failed to fetch module certification status",
                }
            );
        }
    }
);

/* ===========================
   SLICE
=========================== */
const moduleCertificationSlice = createSlice({
    name: "moduleCertification",

    initialState: {
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
    },

    reducers: {
        resetModuleCertificationState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },

        clearModuleCertificationData: (state) => {
            state.data = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchModuleCertificationStatus.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })

            .addCase(
                fetchModuleCertificationStatus.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.data = action.payload;
                    state.message = action.payload?.message || "";
                }
            )

            .addCase(
                fetchModuleCertificationStatus.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message =
                        action.payload?.message ||
                        "Failed to fetch module certification status";
                }
            );
    },
});

export const {
    resetModuleCertificationState,
    clearModuleCertificationData,
} = moduleCertificationSlice.actions;

export default moduleCertificationSlice.reducer;