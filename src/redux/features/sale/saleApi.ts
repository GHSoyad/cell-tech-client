import { baseApi } from '../../baseApi';


// Define a service using a base URL and expected endpoints
export const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sellProduct: builder.mutation({
      query: (data) => ({
        url: `/sale`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["products"],
    })
  }),
})

// Auto-generated hooks based on the defined endpoints for usage in functional components
export const {
  useSellProductMutation
} = saleApi;