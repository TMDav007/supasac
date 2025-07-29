import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { authApiSlice } from './api/admin/authApiSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    rootReducer: rootReducer,
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    // themeSetting: themeSettingSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApiSlice.middleware);
  },
});

export default store;
