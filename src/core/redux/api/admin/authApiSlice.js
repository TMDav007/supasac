import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3210/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        // include token in req header
        headers.set('authorization', `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (data) => ({
          url: '/auth/login',
          method: 'POST',
          body: data,
        }),
      }),
      userDetails: builder.query({
        query: () => ({
          url: '/auth/me',
          method: 'GET',
        }),
      }),
    };
  },
});

export const { useLoginMutation, useUserDetailsQuery } = authApiSlice;
