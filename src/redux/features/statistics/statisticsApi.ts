import { baseApi } from '../../baseApi';


// Define a service using a base URL and expected endpoints
export const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: (data) => ({
        url: `/statistics/sales?days=${data.days}`,
      }),
    }),
  }),
})

// Auto-generated hooks based on the defined endpoints for usage in functional components
export const {
  useGetStatisticsQuery,
} = statisticsApi;