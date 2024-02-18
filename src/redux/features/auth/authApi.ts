import { baseApi } from '../../baseApi';


// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

// Auto-generated hooks based on the defined endpoints for usage in functional components
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
} = authApi;