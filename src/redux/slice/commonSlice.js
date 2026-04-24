import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/axios";
import { getAuthConfig } from "../../utils/authConfig";

/* ===========================
   GET ROLES
=========================== */
export const getRoles = createAsyncThunk(
    "common/getRoles",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                "/v1/common/roles?status=all",
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Something went wrong" }
            );
        }
    }
);

/* ===========================
   GET DESIGNATIONS
=========================== */
export const getDesignations = createAsyncThunk(
    "common/getDesignations",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                "/v1/common/designations?status=all",
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Something went wrong" }
            );
        }
    }
);

/* ===========================
   SLICE
=========================== */
const commonSlice = createSlice({
    name: "common",
    initialState: {
        roles: [],
        designations: [],
        isLoading: false,
        isError: false,
        message: "",
    },
    reducers: {
        resetCommonState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder

            /* ===== ROLES ===== */
            .addCase(getRoles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles = action.payload?.data || [];
            })
            .addCase(getRoles.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== DESIGNATIONS ===== */
            .addCase(getDesignations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDesignations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.designations = action.payload?.data || [];
            })
            .addCase(getDesignations.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            });
    },
});

export const { resetCommonState } = commonSlice.actions;
export default commonSlice.reducer;