import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import feedbackReducer from './slices/feedbackSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feedback: feedbackReducer,
    user: userReducer
  }
});
