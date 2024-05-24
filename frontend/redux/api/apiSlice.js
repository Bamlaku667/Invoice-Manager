import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // authentification endpoints
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "post",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        method: "post",
        url: "auth/logout",
      }),
    }),
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/signup",
        method: "post",
        body: credentials,
      }),
    }),
    editUserInfo: builder.mutation({
      query: (data) => ({
        url: "auth/edit",
        method: "patch",
        body: data,
      }),
    }),
    // invoice endpoints
    getInvoice: builder.query({
      query: (id) => `invoices/${id}`,
    }),
    getInvoices: builder.query({
      query: () => "invoices",
    }),
    addInvoice: builder.mutation({
      query: (invoice) => ({
        url: "invoices",
        method: "POST",
        body: invoice,
      }),
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `invoices/${id}`,
        method: "DELETE",
      }),
    }),
    updateInvoice: builder.mutation({
      query: (invoice) => ({
        url: `invoices/${invoice?.id}`,
        method: "PATCH",
        body: invoice,
      }),
    }),
    downloadPdf: builder.mutation({
      query: (id) => ({
        url: `invoices/export-pdf/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/pdf", // Specify the Content-Type as application/pdf
        },
        body: {}, // Add any required request body here
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useEditUserInfoMutation,
  useGetInvoicesQuery,
  useAddInvoiceMutation,
  useDeleteInvoiceMutation,
  useUpdateInvoiceMutation,
  useDownloadPdfMutation,
  useGetInvoiceQuery,
} = api;
