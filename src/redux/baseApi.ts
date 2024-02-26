import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store';
import toast from 'react-hot-toast';
import { logout } from './features/auth/authSlice';


const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithVerifyToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    toast.error("Token is Invalid, Please Login Again!");
    api.dispatch(logout());
    return;
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithVerifyToken,
  tagTypes: ["products", "users"],
  endpoints: () => ({}),
});