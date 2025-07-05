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
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
    getSingleBook: builder.query({
      query: (bookId) => {
        console.log("inside base api, bookId:", bookId);
        return `/books/${bookId}`;
      },
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    updateBook: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/books/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    borrowBook: builder.mutation({
      query: (data) => ({
        url: `/borrow`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetSingleBookQuery,
  useBorrowBookMutation,
} = baseApi;
