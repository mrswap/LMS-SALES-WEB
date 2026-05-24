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

// ================= API 3: GET INBOX =================
export const getInboxConversations = createAsyncThunk(
    "support/getInboxConversations",
    async (params = {}, thunkAPI) => {
        try {
            const query = new URLSearchParams(params).toString();
            const res = await axiosInstance.get(
                `/trainee/support/inbox?${query}`,
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

// ================= API 4: MARK THREAD AS READ =================
export const markThreadAsRead = createAsyncThunk(
    "support/markThreadAsRead",
    async (threadId, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/trainee/support/threads/${threadId}/read`,
                {},
                getAuthConfig()
            );
            return {
                threadId,
                data: res.data,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);

// ================= INITIAL STATE =================
const initialState = {
    thread: null,
    messages: [],
    inboxConversations: [],
    inboxPagination: null,
    loading: false,
    sending: false,
    inboxLoading: false,
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

        // ================= REALTIME MESSAGE =================
        addRealtimeMessage: (state, action) => {
            const newMessage = action.payload;
            const exists = state.messages.some(
                (msg) => msg.id === newMessage.id
            );
            if (!exists) {
                state.messages.push(newMessage);
            }
            const inboxIndex = state.inboxConversations.findIndex(
                (item) => item.id === newMessage.thread_id
            );
            if (inboxIndex !== -1) {
                state.inboxConversations[inboxIndex].last_message =
                    newMessage;
                const updatedThread =
                    state.inboxConversations[inboxIndex];
                state.inboxConversations.splice(inboxIndex, 1);
                state.inboxConversations.unshift(updatedThread);
            }
        },

        // ================= THREAD STATUS =================
        updateThreadStatus: (state, action) => {
            if (state.thread) {
                state.thread.status = action.payload;
            }
        },
    },

    extraReducers: (builder) => {
        builder
            // ================= GET / CREATE THREAD =================
            .addCase(getOrCreateThread.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrCreateThread.fulfilled, (state, action) => {
                state.loading = false;
                state.thread = action.payload.data;
                state.messages =
                    action.payload.data.messages || [];
            })
            .addCase(getOrCreateThread.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ================= SEND MESSAGE =================
            .addCase(sendMessage.pending, (state) => {
                state.sending = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.sending = false;
                const realMessage = action.payload.data;
                const lastMessage =
                    state.messages[state.messages.length - 1];
                if (lastMessage && lastMessage.pending) {
                    state.messages[state.messages.length - 1] =
                        realMessage;
                } else {
                    state.messages.push(realMessage);
                }

                // thread status update
                if (
                    state.thread &&
                    realMessage.thread_id === state.thread.id
                ) {
                    if (state.thread.status === "resolved") {
                        state.thread.status = "reopened";
                    }
                }

                // inbox update
                const inboxIndex =
                    state.inboxConversations.findIndex(
                        (item) =>
                            item.id === realMessage.thread_id
                    );

                if (inboxIndex !== -1) {
                    state.inboxConversations[
                        inboxIndex
                    ].last_message = realMessage;
                    const updatedThread =
                        state.inboxConversations[inboxIndex];
                    state.inboxConversations.splice(
                        inboxIndex,
                        1
                    );
                    state.inboxConversations.unshift(
                        updatedThread
                    );
                }
            })

            .addCase(sendMessage.rejected, (state, action) => {
                state.sending = false;
                state.error = action.payload;
                const tempIndex = state.messages.findIndex(
                    (m) => m.pending === true
                );
                if (tempIndex !== -1) {
                    state.messages.splice(tempIndex, 1);
                }
            })

            // ================= GET INBOX =================
            .addCase(getInboxConversations.pending, (state) => {
                state.inboxLoading = true;
            })
            .addCase(
                getInboxConversations.fulfilled,
                (state, action) => {
                    state.inboxLoading = false;
                    state.inboxConversations =
                        action.payload.data?.data || [];
                    state.inboxPagination = {
                        current_page: action.payload.data?.current_page,
                        last_page: action.payload.data?.last_page,
                        per_page: action.payload.data?.per_page,
                        total: action.payload.data?.total,
                    };
                }
            )
            .addCase(
                getInboxConversations.rejected,
                (state, action) => {
                    state.inboxLoading = false;
                    state.error = action.payload;
                }
            )

            // ================= MARK THREAD AS READ =================
            .addCase(markThreadAsRead.pending, (state) => {
                state.markReadLoading = true;
                state.error = null;
            })
            .addCase(markThreadAsRead.fulfilled, (state, action) => {
                state.markReadLoading = false;
                const { threadId } = action.payload;
                const inboxIndex =
                    state.inboxConversations.findIndex(
                        (item) => item.id === threadId
                    );
                if (inboxIndex !== -1) {
                    state.inboxConversations[inboxIndex].unread_count = 0;
                }
                if (
                    state.thread &&
                    state.thread.id === threadId
                ) {
                    state.thread.unread_count = 0;
                }
            })
            .addCase(markThreadAsRead.rejected, (state, action) => {
                state.markReadLoading = false;
                state.error = action.payload;
            })
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