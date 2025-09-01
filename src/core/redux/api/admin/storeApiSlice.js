import { apiSlice } from '../apiSlice';

export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      adminCreateStore: builder.mutation({
        query: (data) => ({
          url: 'store/admin/create',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: 'Store', id: 'LIST' }],
      }),
      adminEditStore: builder.mutation({
        query: ({ id, data }) => ({
          url: `store/admin/${id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: 'Store', id },
          { type: 'Store', id: 'LIST' },
        ],
      }),
      getStore: builder.query({
        query: (id) => ({
          url: `/store/${id}`,
          method: 'GET',
        }),
      }),
      getStores: builder.query({
        query: () => ({
          url: '/store/',
          providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'Store', id })),
                  { type: 'Store', id: 'LIST' },
                ]
              : [{ type: 'Store', id: 'LIST' }],
        }),
      }),
      deleteStore: builder.mutation({
        query: (id) => ({
          url: `/store/${id}`,
          method: 'DELETE',
        }),
      }),
    };
  },
});

export const {
  useAdminCreateStoreMutation,
  useAdminEditStoreMutation,
  useGetStoreQuery,
  useGetStoresQuery,
  useDeleteStoreMutation,
} = storeApiSlice;
