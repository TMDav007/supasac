import { createSlice } from '@reduxjs/toolkit';

// initialize userToken from local storage
// const token = localStorage.getItem('token')
//   ? localStorage.getItem('token')
//   : null;

const initialState = {
  loading: false,
  user: null,
  token: null,
  isLoggedIn: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    setCredentials: (state, action) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.isLoggedIn = true;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    loadFromStorage: (state) => {
      const stored = localStorage.getItem('auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        state.token = parsed.token;
        // state.refreshToken = parsed.refreshToken;
        state.user = parsed.user;
      }
    },
  },
});

export const { logout, setCredentials, loadFromStorage } = authSlice.actions;

export default authSlice.reducer;
