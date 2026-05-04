import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/axios";
import { getAuthConfig } from "../../utils/authConfig";

/* ===========================
   START ATTEMPT (POST)
=========================== */
export const startAttempt = createAsyncThunk(
    "quiz/startAttempt",
    async (topicId, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/trainee/assessments/${topicId}/start`,
                {},
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to start attempt" }
            );
        }
    }
);

/* ===========================
   FETCH QUESTIONS (GET)
=========================== */
export const fetchQuestions = createAsyncThunk(
    "quiz/fetchQuestions",
    async ({ topicId, attemptId }, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                `/trainee/assessments/${topicId}/questions?attempt_id=${attemptId}`,
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to fetch questions" }
            );
        }
    }
);

/* ===========================
   SKIP QUESTION (POST)
=========================== */
export const skipQuestion = createAsyncThunk(
    "quiz/skipQuestion",
    async ({ attemptId, questionId }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/trainee/assessments/answer`,
                {
                    attempt_id: attemptId,
                    question_id: questionId,
                    selected_option_id: null,
                },
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to skip question" }
            );
        }
    }
);

/* ===========================
   SUBMIT ANSWER (POST)
=========================== */
export const submitAnswer = createAsyncThunk(
    "quiz/submitAnswer",
    async ({ attemptId, questionId, optionId }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/trainee/assessments/answer`,
                {
                    attempt_id: attemptId,
                    question_id: questionId,
                    selected_option_id: optionId,
                },
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to submit answer" }
            );
        }
    }
);


/* ===========================
   SUBMIT COMPLETE QUIZ (POST)
=========================== */
export const submitQuiz = createAsyncThunk(
    "quiz/submitQuiz",
    async ({ attemptId, topicId }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/trainee/assessments/${topicId}/submit`,
                {
                    attempt_id: attemptId
                },
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to submit quiz" }
            );
        }
    }
);

/* ===========================
   SUBMIT FEEDBACK (POST)
=========================== */

export const submitFeedback = createAsyncThunk(
    "quiz/submitFeedback",
    async ({ topicId, attemptId, rating, review }, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/trainee/assessments/${topicId}/feedback`,
                {
                    attempt_id: attemptId,
                    rating: rating,
                    review: review,
                },
                getAuthConfig()
            );
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Failed to submit feedback" }
            );
        }
    }
);

/* ===========================
   SLICE
=========================== */
const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        attempt: null,
        questions: [],
        currentQuestionIndex: 0,
        quizResults: null,
        feedbackSubmitted: false,
        feedbackData: null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },

    reducers: {
        resetQuizState: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },

        clearQuizData: (state) => {
            state.attempt = null;
            state.questions = [];
            state.currentQuestionIndex = 0;
            state.quizResults = null;
            state.feedbackSubmitted = false;
            state.feedbackData = null;
        },

        // Add this new reducer specifically for resetting feedback state
        resetFeedbackState: (state) => {
            state.feedbackSubmitted = false;
            state.feedbackData = null;
        },

        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1;
            }
        },

        prevQuestion: (state) => {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex -= 1;
            }
        },

        clearQuizResults: (state) => {
            state.quizResults = null;
        },
    },

    extraReducers: (builder) => {
        builder
            /* ===== START ATTEMPT ===== */
            .addCase(startAttempt.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(startAttempt.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.attempt = action.payload.attempt || action.payload;
                state.message = action.payload.message;
            })
            .addCase(startAttempt.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== FETCH QUESTIONS ===== */
            .addCase(fetchQuestions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.questions = action.payload.questions || action.payload.data || [];
                state.currentQuestionIndex = 0;
                state.message = action.payload.message;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== SKIP QUESTION ===== */
            .addCase(skipQuestion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(skipQuestion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                if (state.currentQuestionIndex < state.questions.length - 1) {
                    state.currentQuestionIndex += 1;
                }
            })
            .addCase(skipQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== SUBMIT ANSWER ===== */
            .addCase(submitAnswer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(submitAnswer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                if (state.currentQuestionIndex < state.questions.length - 1) {
                    state.currentQuestionIndex += 1;
                }
            })
            .addCase(submitAnswer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== SUBMIT COMPLETE QUIZ ===== */
            .addCase(submitQuiz.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(submitQuiz.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                // Store the quiz results from API response
                state.quizResults = action.payload;
            })
            .addCase(submitQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            })

            /* ===== SUBMIT FEEDBACK ===== */
            .addCase(submitFeedback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(submitFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.feedbackSubmitted = true;
                state.feedbackData = action.payload;
                state.message = action.payload.message;
            })
            .addCase(submitFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload?.message;
            });
    },
});

export const {
    resetQuizState,
    clearQuizData,
    nextQuestion,
    prevQuestion,
    clearQuizResults,
    resetFeedbackState,
} = quizSlice.actions;

export default quizSlice.reducer;