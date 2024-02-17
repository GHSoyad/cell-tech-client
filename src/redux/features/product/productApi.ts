import { IProduct } from '../../../types/productTypes'
import { baseApi } from '../../baseApi';


// Define a service using a base URL and expected endpoints
export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => `/phones`,
    }),
  }),
})

// Auto-generated hooks based on the defined endpoints for usage in functional components
export const { useGetProductsQuery } = productApi;