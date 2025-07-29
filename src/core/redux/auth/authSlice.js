import { createSlice } from '@reduxjs/toolkit';

// initialize userToken from local storage
const userToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.userInfo(null);
    },
    setCredentials: (state, actions) => {
      state.userInfo = actions.payload;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
