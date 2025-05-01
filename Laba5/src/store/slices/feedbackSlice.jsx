import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feedbacks: [],
  loading: false,
  error: null
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    fetchFeedbacksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFeedbacksSuccess(state, action) {
      state.feedbacks = action.payload;
      state.loading = false;
    },
    fetchFeedbacksFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addFeedbackStart(state) {
      state.loading = true;
      state.error = null;
    },
    addFeedbackSuccess(state, action) {
      state.feedbacks.unshift(action.payload);
      state.loading = false;
    },
    addFeedbackFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteFeedbackStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteFeedbackSuccess(state, action) {
      state.feedbacks = state.feedbacks.filter(f => f.id !== action.payload);
      state.loading = false;
    },
    deleteFeedbackFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  fetchFeedbacksStart,
  fetchFeedbacksSuccess,
  fetchFeedbacksFailure,
  addFeedbackStart,
  addFeedbackSuccess,
  addFeedbackFailure,
  deleteFeedbackStart,
  deleteFeedbackSuccess,
  deleteFeedbackFailure
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
