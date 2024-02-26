import { baseApi } from '../../baseApi';


// Define a service using a base URL and expected endpoints
export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `/products`,
      }),
      providesTags: ["products"]
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/product`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/product/${_id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["products"],
    }),
    deleteBulkProducts: builder.mutation({
      query: (ids) => ({
        url: `/products?ids=${ids}`,
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