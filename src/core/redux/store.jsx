import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import authReducer, { loadFromStorage } from './auth/authSlice';
import themeSettingSlice from './themeSettingSlice';

import { apiSlice } from './api/apiSlice';

const store = configureStore({
  reducer: {
    rootReducer: rootReducer,
    auth: authReducer,
    themeSetting: themeSettingSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});
// Load persisted auth before rendering
store.dispatch(loadFromStorage());
export default store;
