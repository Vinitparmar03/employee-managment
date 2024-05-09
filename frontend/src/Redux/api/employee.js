import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeAPI = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/v1/employees/`,
    credentials: "include",
  }),
  tagTypes: ["employees"],
  endpoints: (builder) => ({
    addEmployee: builder.mutation({
      query: (formData) => ({
        url: "add",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["employees"],
    }),
    getEmployees: builder.query({
      query: () => "getallemployees",
      providesTags: ["employees"],
    }),
    updateEmployee: builder.mutation({
      query: ({ employeeId, formData }) => ({
        url: employeeId,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["employees"],
    }),
    deleteEmployee: builder.mutation({
      query: (employeeId) => ({
        url: employeeId,
        method: "DELETE",
      }),
      invalidatesTags: ["employees"],
    }),
    getSingleEmployee: builder.query({
      query: (employeeId) => employeeId,

      providesTags: ["employees"],
    }),
  }),
});

export const {
  useAddEmployeeMutation,
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} = employeeAPI;
