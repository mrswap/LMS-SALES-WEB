import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/axios";
import { getAuthConfig } from "../../utils/authConfig";

/* ===========================
   GET PROFILE
=========================== */
export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                "/v1/trainee/profile",
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch profile" }
            );
        }
    }
);

/* ===========================
   UPDATE PROFILE
=========================== */
export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (profileData, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                "/v1/trainee/update-profile",
                profileData,
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to update profile" }
            );
        }
    }
);

/* ===========================
   CHANGE PASSWORD
=========================== */
export const changePassword = createAsyncThunk(
    "profile/changePassword",
    async (passwordData, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                "/v1/trainee/change-password",
                passwordData,
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to change password" }
            );
        }
    }
);

/* ===========================
   SLICE
=========================== */
const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },
    reducers: {
        resetProfileState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearProfile: (state) => {
            state.profile = null;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            /* ===== GET PROFILE ===== */
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.profile = action.payload.data || action.payload;
                state.message = action.payload.message;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== UPDATE PROFILE ===== */
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.profile = action.payload.data || action.payload;
                state.message = action.payload.message;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== CHANGE PASSWORD ===== */
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            });
    },
});

export const { resetProfileState, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;