import { baseApi } from '../../baseApi';


// Define a service using a base URL and expected endpoints
export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `/phones`,
      }),
      providesTags: ["products"]
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/phone`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/phone/${_id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/phone/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["products"],
    }),
    deleteBulkProducts: builder.mutation({
      query: (ids) => ({
        url: `/phones?ids=${ids}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["products"],
    })
  }),
})

// Auto-generated hooks based on the defined endpoints for usage in functional components
export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteBulkProductsMutation,
} = productApi;