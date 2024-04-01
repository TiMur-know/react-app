import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LogEntry } from '../../types/LogEntry';

const BASE_URL=import.meta.env.VITE_API
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL+'/logs' }); 

export const logsApi = createApi({
  reducerPath: 'logsApi',
  baseQuery,
  endpoints: (builder) => ({
    getLogs: builder.query<LogEntry[], void>({
      query: () => '/',
    }),
    getLogById: builder.query<LogEntry, string>({
      query: (id) => `/log/${id}`,
    }),
    createLog: builder.mutation<LogEntry, Partial<LogEntry>>({
      query: (newLogData) => ({
        url: '/',
        method: 'POST',
        body: newLogData,
      }),
    }),
    updateLog: builder.mutation<LogEntry, Partial<LogEntry>>({
      query: (updatedLogData) => ({
        url: `/log/${updatedLogData.id}`,
        method: 'PUT',
        body: updatedLogData,
      }),
    }),
    deleteLog: builder.mutation<void, string>({
      query: (id) => ({
        url: `/log/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetLogsQuery,
  useGetLogByIdQuery,
  useCreateLogMutation,
  useUpdateLogMutation,
  useDeleteLogMutation,
} = logsApi;
