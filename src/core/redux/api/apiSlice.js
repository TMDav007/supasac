import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        // include token in req header
        headers.set('authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
        return headers;
      }
    },
  }),
  tagTypes: ['Store'],
  endpoints: () => ({}),
});
