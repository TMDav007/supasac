import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { authApiSlice } from './api/admin/authApiSlice';
import authReducer from './auth/authSlice';
import themeSettingSlice from './themeSettingSlice';

const store = configureStore({
  reducer: {
    rootReducer: rootReducer,
    auth: authReducer,
    themeSetting: themeSettingSlice,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApiSlice.middleware);
  },
});

export default store;
