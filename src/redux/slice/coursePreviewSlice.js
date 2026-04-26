import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/axios";
import { getAuthConfig } from "../../utils/authConfig";

/* ===========================
   GET ALL LEVELS
=========================== */
export const getAllLevels = createAsyncThunk(
    "coursePreview/getAllLevels",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/trainee/hierarchy", getAuthConfig());
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch levels" }
            );
        }
    }
);

/* ===========================
   GET LEVEL BY ID
=========================== */
export const getLevelById = createAsyncThunk(
    "coursePreview/getLevelById",
    async (levelId, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                // `/trainee/progress`,
                `/trainee/hierarchy/level/${levelId}`, getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch level" }
            );
        }
    }
);

/* ===========================
   GET MODULE BY ID
=========================== */
export const getModuleById = createAsyncThunk(
    "coursePreview/getModuleById",
    async (moduleId, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                `/trainee/hierarchy/module/${moduleId}`, getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch module" }
            );
        }
    }
);

/* ===========================
   GET CHAPTER BY ID
=========================== */
export const getChapterById = createAsyncThunk(
    "coursePreview/getChapterById",
    async (chapterId, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                `/trainee/hierarchy/chapter/${chapterId}`, getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch chapter" }
            );
        }
    }
);

/* ===========================
   GET TOPIC BY ID
=========================== */
export const getTopicById = createAsyncThunk(
    "coursePreview/getTopicById",
    async (topicId, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                `/trainee/content/topics/${topicId}`,
                getAuthConfig()
            );

            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch topic" }
            );
        }
    }
);

/* ===========================
   GET SINGLE CONTENT
=========================== */
export const getSingleContent = createAsyncThunk(
    "coursePreview/getSingleContent",
    async ({ topicId, contentId }, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                `/trainee/content/single-preview/${topicId}/${contentId}`,
                getAuthConfig()
            );

            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch content" }
            );
        }
    }
);

/* ===========================
   TOGGLE READ STATUS (MARK AS READ)
=========================== */
export const markContentAsRead = createAsyncThunk(
    "coursePreview/markContentAsRead",
    async ({ contentId }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/trainee/content/${contentId}/toggle-read`,
                {}, // Empty body if not needed
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to mark content as read" }
            );
        }
    }
);

/* ===========================
   SLICE
=========================== */
const coursePreviewSlice = createSlice({
    name: "coursePreview",
    initialState: {
        levels: [],
        currentLevel: null,
        currentModule: null,
        currentChapter: null,
        currentTopic: null,
        currentContent: null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },
    reducers: {
        resetCoursePreviewState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
        clearCurrentData: (state) => {
            state.currentLevel = null;
            state.currentModule = null;
            state.currentChapter = null;
            state.currentTopic = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* ===== GET ALL LEVELS ===== */
            .addCase(getAllLevels.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllLevels.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.levels = action.payload.data || action.payload;
                state.message = action.payload.message;
            })
            .addCase(getAllLevels.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== GET LEVEL BY ID ===== */
            .addCase(getLevelById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLevelById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentLevel = action.payload.data || action.payload;
                state.message = action.payload.message;
            })
            .addCase(getLevelById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== GET MODULE BY ID ===== */
            .addCase(getModuleById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getModuleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentModule = action.payload.data || action.payload;
                state.message = action.payload.message;
            })
            .addCase(getModuleById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== GET CHAPTER BY ID ===== */
            .addCase(getChapterById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChapterById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentChapter = action.payload.data || action.payload;
                state.message = action.payload.message;
            })
            .addCase(getChapterById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== GET TOPIC BY ID ===== */
            .addCase(getTopicById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTopicById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentTopic = action.payload.data || action.payload;
                state.message = action.payload.message;
            })
            .addCase(getTopicById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== GET SINGLE CONTENT ===== */
            .addCase(getSingleContent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleContent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.currentContent = action.payload.data || action.payload;
                state.message = action.payload.message;
            })
            .addCase(getSingleContent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })
    },
});

export const { resetCoursePreviewState, clearCurrentData } = coursePreviewSlice.actions;
export default coursePreviewSlice.reducer;