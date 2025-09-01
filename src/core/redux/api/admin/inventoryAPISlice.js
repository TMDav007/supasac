import { apiSlice } from '../apiSlice';

export const inventoryAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      createCategory: builder.mutation({
        query: (data) => ({
          url: '/category/',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: 'Category', id: 'LIST' }],
      }),
      editCategory: builder.mutation({
        query: ({ id, data }) => ({
          url: `category/${id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: 'Category', id },
          { type: 'Category', id: 'LIST' },
        ],
      }),
      getAllCategories: builder.query({
        query: () => ({
          url: '/category/',
          method: 'GET',
          providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'Category', id })),
                  { type: 'Category', id: 'LIST' },
                ]
              : [{ type: 'Category', id: 'LIST' }],
        }),
      }),
      getCategory: builder.query({
        query: (id) => ({
          url: `/category/${id}`,
          method: 'GET',
        }),
      }),
      deleteCategory: builder.mutation({
        query: (id) => ({
          url: `/category/${id}`,
          method: 'DELETE',
        }),
      }),

      createSubCategory: builder.mutation({
        query: (data) => ({
          url: '/subcategory/',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: 'SubCategory', id: 'LIST' }],
      }),
      getAllSubCategories: builder.query({
        query: () => ({
          url: '/subcategory/',
          method: 'GET',
          providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'SubCategory', id })),
                  { type: 'SubCategory', id: 'LIST' },
                ]
              : [{ type: 'SubCategory', id: 'LIST' }],
        }),
      }),
      getSubCategory: builder.query({
        query: (id) => ({
          url: `/subcategory/${id}`,
          method: 'GET',
        }),
      }),
      editSubCategory: builder.mutation({
        query: ({ id, data }) => ({
          url: `subcategory/${id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: 'SubCategory', id },
          { type: 'SubCategory', id: 'LIST' },
        ],
      }),
      deleteSubCategory: builder.mutation({
        query: (id) => ({
          url: `/subcategory/${id}`,
          method: 'DELETE',
        }),
      }),
    };
  },
});

export const {
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useGetCategoryQuery,
  useGetSubCategoryQuery,
  useGetAllCategoriesQuery,
  useEditCategoryMutation,
  useEditSubCategoryMutation,
  useGetAllSubCategoriesQuery,
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation,
} = inventoryAPISlice;
