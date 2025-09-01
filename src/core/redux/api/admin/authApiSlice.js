import { setCredentials } from '../../auth/authSlice';
import { apiSlice } from '../apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              token: data.data.accessToken,
              user: data.data.userInfo,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),
    userDetails: builder.query({
      query: () => '/auth/me',
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useUserDetailsQuery } = authApiSlice;
