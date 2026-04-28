// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../app/axios";
// import { getAuthConfig } from "../../utils/authConfig";

// /* ===========================
//    GET ROLES
// =========================== */
// export const getRoles = createAsyncThunk(
//     "common/getRoles",
//     async (_, thunkAPI) => {
//         try {
//             const res = await axiosInstance.get(
//                 "/common/roles?status=all",
//                 getAuthConfig()
//             );
//             return res.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(
//                 error.response?.data || { message: "Something went wrong" }
//             );
//         }
//     }
// );

// /* ===========================
//    GET DESIGNATIONS
// =========================== */
// export const getDesignations = createAsyncThunk(
//     "common/getDesignations",
//     async (_, thunkAPI) => {
//         try {
//             const res = await axiosInstance.get(
//                 "/common/designations?status=all",
//                 getAuthConfig()
//             );
//             return res.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(
//                 error.response?.data || { message: "Something went wrong" }
//             );
//         }
//     }
// );

// /* ===========================
//    SLICE
// =========================== */
// const commonSlice = createSlice({
//     name: "common",
//     initialState: {
//         roles: [],
//         designations: [],
//         isLoading: false,
//         isError: false,
//         message: "",
//     },
//     reducers: {
//         resetCommonState: (state) => {
//             state.isLoading = false;
//             state.isError = false;
//             state.message = "";
//         },
//     },
//     extraReducers: (builder) => {
//         builder 

//             /* ===== ROLES ===== */
//             .addCase(getRoles.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(getRoles.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.roles = action.payload?.data || [];
//             })
//             .addCase(getRoles.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.isError = true;
//                 state.message = action.payload?.message;
//             })

//             /* ===== DESIGNATIONS ===== */
//             .addCase(getDesignations.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(getDesignations.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.designations = action.payload?.data || [];
//             })
//             .addCase(getDesignations.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.isError = true;
//                 state.message = action.payload?.message;
//             });
//     },
// });

// export const { resetCommonState } = commonSlice.actions;
// export default commonSlice.reducer;


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
                "/common/roles?status=all",
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
                "/common/designations?status=all",
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
   UPDATE SITE SETTINGS
=========================== */
export const updateSiteSettings = createAsyncThunk(
    "common/updateSiteSettings",
    async (settingsData, thunkAPI) => {
        try {
            const res = await axiosInstance.put(
                "/common/site/settings",
                settingsData,
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
   GET CONTACT INFO
=========================== */
export const getContactInfo = createAsyncThunk(
    "common/getContactInfo",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                "/common/contact",
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
   UPDATE CONTACT INFO
=========================== */
export const updateContactInfo = createAsyncThunk(
    "common/updateContactInfo",
    async (contactData, thunkAPI) => {
        try {
            const res = await axiosInstance.put(
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
        clearSiteSettings: (state) => {
            state.siteSettings = null;
        },
        clearContactInfo: (state) => {
            state.contactInfo = null;
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

            /* ===== SITE SETTINGS - UPDATE ===== */
            .addCase(updateSiteSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSiteSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.siteSettings = action.payload?.data || action.payload;
                state.isError = false;
                state.message = "Site settings updated successfully";
            })
            .addCase(updateSiteSettings.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== CONTACT INFO - GET ===== */
            .addCase(getContactInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getContactInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contactInfo = action.payload?.data || action.payload;
                state.isError = false;
            })
            .addCase(getContactInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== CONTACT INFO - UPDATE ===== */
            .addCase(updateContactInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateContactInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contactInfo = action.payload?.data || action.payload;
                state.isError = false;
                state.message = "Contact info updated successfully";
            })
            .addCase(updateContactInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            });
    },
});

export const { resetCommonState, clearSiteSettings, clearContactInfo } = commonSlice.actions;
export default commonSlice.reducer;