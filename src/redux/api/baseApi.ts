import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-lilac-five.vercel.app/api",
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["book"],
    }),
    createBook: builder.mutation({
      query: (taskData) => ({
        url: "/books",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const { useGetBooksQuery, useCreateBookMutation } = baseApi;
