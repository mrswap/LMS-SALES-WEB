import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/axios";
import { getAuthConfig } from "../../utils/authConfig";

// ================= API 1: GET OR CREATE THREAD =================
export const getOrCreateThread = createAsyncThunk(
    "support/getOrCreateThread",
    async (topicId, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                `/trainee/support/topics/${topicId}/thread`,
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

// ================= API 2: SEND MESSAGE =================
export const sendMessage = createAsyncThunk(
    "support/sendMessage",
    async ({ threadId, formData }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/trainee/support/threads/${threadId}/message`,
                formData,
                getAuthConfig("multipart/form-data")
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

// ================= INITIAL STATE =================
const initialState = {
    thread: null,
    messages: [],
    loading: false,
    sending: false,
    error: null,
};

// ================= SLICE =================
const supportSlice = createSlice({
    name: "support",
    initialState,
    reducers: {
        clearThread: (state) => {
            state.thread = null;
            state.messages = [];
            state.error = null;
        },

        addOptimisticMessage: (state, action) => {
            state.messages.push(action.payload);
        },

        removeOptimisticMessage: (state, action) => {
            const tempId = action.payload;
            state.messages = state.messages.filter(
                (msg) => msg.tempId !== tempId
            );
        },

        // 🔥 REAL TIME MESSAGE ADD KARNE KE LIYE
        addRealtimeMessage: (state, action) => {
            const newMessage = action.payload;
            // Duplicate check - agar message already exist karta hai to mat daal
            const exists = state.messages.some(msg => msg.id === newMessage.id);
            if (!exists) {
                state.messages.push(newMessage);
            }
        },

        // 🔥 THREAD STATUS UPDATE KARNE KE LIYE (agar resolved se open ho)
        updateThreadStatus: (state, action) => {
            if (state.thread) {
                state.thread.status = action.payload;
            }
        }
    },

    extraReducers: (builder) => {
        builder
            // GET OR CREATE THREAD
            .addCase(getOrCreateThread.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrCreateThread.fulfilled, (state, action) => {
                state.loading = false;
                state.thread = action.payload.data;
                state.messages = action.payload.data.messages || [];
            })
            .addCase(getOrCreateThread.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // SEND MESSAGE
            .addCase(sendMessage.pending, (state) => {
                state.sending = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.sending = false;
                const realMessage = action.payload.data;
                const lastMessage = state.messages[state.messages.length - 1];

                if (lastMessage && lastMessage.pending) {
                    state.messages[state.messages.length - 1] = realMessage;
                } else {
                    state.messages.push(realMessage);
                }

                if (state.thread && realMessage.thread_id === state.thread.id) {
                    if (state.thread.status === 'resolved') {
                        state.thread.status = 'reopened';
                    }
                }
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.sending = false;
                state.error = action.payload;
                const tempIndex = state.messages.findIndex(m => m.pending === true);
                if (tempIndex !== -1) {
                    state.messages.splice(tempIndex, 1);
                }
            });
    },
});

// ================= EXPORTS =================
export const {
    clearThread,
    addOptimisticMessage,
    removeOptimisticMessage,
    addRealtimeMessage,
    updateThreadStatus,
} = supportSlice.actions;

export default supportSlice.reducer;