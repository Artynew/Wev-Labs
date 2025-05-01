import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfileStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    updateProfileFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { updateProfileStart, updateProfileSuccess, updateProfileFailure } = userSlice.actions;
export default userSlice.reducer;
