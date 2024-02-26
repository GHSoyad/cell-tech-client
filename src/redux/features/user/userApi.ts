import { baseApi } from '../../baseApi';


// Define a service using a base URL and expected endpoints
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
      }),
      providesTags: ["users"]
    }),
    updateUser: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/user/${_id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["users"],
    })
  }),
})

// Auto-generated hooks based on the defined endpoints for usage in functional components
export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;