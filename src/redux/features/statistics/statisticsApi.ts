import { baseApi } from '../../baseApi';


// Define a service using a base URL and expected endpoints
export const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesByAmount: builder.query({
      query: (data) => ({
        url: `/statistics/sales-by-amount?days=${data.days}&userId=${data.userId}`,
      }),
    }),
    getSalesByProduct: builder.query({
      query: (data) => ({
        url: `/statistics/sales-by-product?days=${data.days}&userId=${data.userId}`,
      }),
    }),
  }),
})

// Auto-generated hooks based on the defined endpoints for usage in functional components
export const {
  useGetSalesByAmountQuery,
  useGetSalesByProductQuery,
} = statisticsApi;