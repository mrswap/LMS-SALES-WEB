import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/axios";
import { getAuthConfig } from "../../utils/authConfig";

/* ===========================
   GET ROLES
=========================== */
export const getRoles = createAsyncThunk(
    "common/getRoles",
    async (params, thunkAPI) => {
        try {
            const query = new URLSearchParams(params).toString();
            const res = await axiosInstance.get(
                `/common/roles?${query}`,
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
    async (params, thunkAPI) => {
        try {
            const query = new URLSearchParams(params).toString();
            const res = await axiosInstance.get(
                `/common/designations?${query}`,
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
   GET SITE SETTINGS
=========================== */
export const getSiteSettings = createAsyncThunk(
    "common/getSiteSettings",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                "/common/site/settings",
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
   POST CONTACT US
=========================== */
export const postContactUs = createAsyncThunk(
    "common/postContactUs",
    async (contactData, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                "/common/contact",
                contactData,
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
        siteSettings: null,
        contactInfo: null,
        contactUsResponse: null,  // New state for contact us response
        isLoading: false,
        isError: false,
        isSubmitting: false,      // Separate loading for form submission
        message: "",
    },
    reducers: {
        resetCommonState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = "";
        },
        clearSiteSettings: (state) => {
            state.siteSettings = null;
        },
        clearContactInfo: (state) => {
            state.contactInfo = null;
        },
        clearContactUsResponse: (state) => {
            state.contactUsResponse = null;
            state.isSubmitting = false;
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
            })

            /* ===== SITE SETTINGS - GET ===== */
            .addCase(getSiteSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSiteSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.siteSettings = action.payload?.data || action.payload;
                state.isError = false;
            })
            .addCase(getSiteSettings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== CONTACT US - POST ===== */
            .addCase(postContactUs.pending, (state) => {
                state.isSubmitting = true;
                state.isError = false;
                state.message = "";
                state.contactUsResponse = null;
            })
            .addCase(postContactUs.fulfilled, (state, action) => {
                state.isSubmitting = false;
                state.contactUsResponse = action.payload?.data || action.payload;
                state.isError = false;
                state.message = action.payload?.message || "Contact form submitted successfully";
            })
            .addCase(postContactUs.rejected, (state, action) => {
                state.isSubmitting = false;
                state.isError = true;
                state.message = action.payload?.message || "Failed to submit contact form";
                state.contactUsResponse = null;
            });
    },
});

export const {
    resetCommonState,
    clearSiteSettings,
    clearContactInfo,
    clearContactUsResponse
} = commonSlice.actions;

export default commonSlice.reducer;