import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/axios";
import { getAuthConfig } from "../../utils/authConfig";

/* ===========================
   GET ALL NOTIFICATIONS
=========================== */
export const getAllNotifications = createAsyncThunk(
    "notification/getAllNotifications",
    async (params, thunkAPI) => {
        try {
            const query = new URLSearchParams(params).toString();
            const url = query ? `/trainee/notifications?${query}` : "/trainee/notifications";
            const res = await axiosInstance.get(url, getAuthConfig());
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch notifications" }
            );
        }
    }
);

/* ===========================
   MARK NOTIFICATION AS READ
=========================== */
export const markNotificationAsRead = createAsyncThunk(
    "notification/markNotificationAsRead",
    async (notificationId, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/trainee/notifications/read/${notificationId}`,
                {},
                getAuthConfig()
            );
            return { data: res.data, notificationId };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to mark notification as read" }
            );
        }
    }
);

/* ===========================
   GET UNREAD COUNT
=========================== */
export const getUnreadCount = createAsyncThunk(
    "notification/getUnreadCount",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                "/trainee/notifications/unread-count",
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch unread count" }
            );
        }
    }
);

/* ===========================
   MARK ALL NOTIFICATIONS AS READ
=========================== */
export const markAllAsRead = createAsyncThunk(
    "notification/markAllAsRead",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                "/trainee/notifications/read-all",
                {},
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to mark all as read" }
            );
        }
    }
);

/* ===========================
   SLICE
=========================== */
const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
        unreadCount: 0,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },
    reducers: {
        resetNotificationState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
        },
        // Local update for unread count without API call
        decrementUnreadCount: (state) => {
            if (state.unreadCount > 0) {
                state.unreadCount -= 1;
            }
        },
        resetUnreadCount: (state) => {
            state.unreadCount = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            /* ===== GET ALL NOTIFICATIONS ===== */
            .addCase(getAllNotifications.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notifications = action.payload.data || action.payload;
                state.message = action.payload.message;
            })
            .addCase(getAllNotifications.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== MARK NOTIFICATION AS READ ===== */
            .addCase(markNotificationAsRead.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                // Update the specific notification's read status
                if (state.notifications && Array.isArray(state.notifications)) {
                    const notification = state.notifications.find(
                        n => n.id === action.payload.notificationId || n._id === action.payload.notificationId
                    );
                    if (notification) {
                        notification.isRead = true;
                        notification.read = true;
                    }
                }

                // Decrement unread count
                if (state.unreadCount > 0) {
                    state.unreadCount -= 1;
                }

                state.message = action.payload.data?.message;
            })
            .addCase(markNotificationAsRead.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== GET UNREAD COUNT ===== */
            .addCase(getUnreadCount.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getUnreadCount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Handle different possible response structures
                state.unreadCount = action.payload.data?.count ||
                    action.payload.count ||
                    action.payload.unreadCount ||
                    0;
                state.message = action.payload.message;
            })
            .addCase(getUnreadCount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== MARK ALL AS READ ===== */
            .addCase(markAllAsRead.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(markAllAsRead.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                // Mark all notifications as read
                if (state.notifications && Array.isArray(state.notifications)) {
                    state.notifications = state.notifications.map(notification => ({
                        ...notification,
                        isRead: true,
                        read: true
                    }));
                }

                // Reset unread count to 0
                state.unreadCount = 0;
                state.message = action.payload.message;
            })
            .addCase(markAllAsRead.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            });
    },
});

export const {
    resetNotificationState,
    clearNotifications,
    decrementUnreadCount,
    resetUnreadCount
} = notificationSlice.actions;

export default notificationSlice.reducer;