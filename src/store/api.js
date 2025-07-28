import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include', 
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getIdioms: builder.query({
      query: () => '/idioms',
    }),
    addIdiom: builder.mutation({
      query: (newIdiom) => ({
        url: '/idioms',
        method: 'POST',
        body: newIdiom,
      }),
    }),
  }),
});

export const { useGetIdiomsQuery, useAddIdiomMutation } = api;
