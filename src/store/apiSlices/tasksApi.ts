import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskEntry } from '../../types/TaskEntry';

const BASE_URL=import.meta.env.VITE_API
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL+'/tasks' }); 

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery,
  endpoints: (builder) => ({
    getTasks: builder.query<TaskEntry[], void>({
      query: () => '/',
    }),
    getTaskById: builder.query<TaskEntry, string>({
      query: (id) => `/task/${id}`,
    }),
    createTask: builder.mutation<TaskEntry, Partial<TaskEntry>>({
      query: (newTaskData) => ({
        url: '/',
        method: 'POST',
        body: newTaskData,
      }),
    }),
    updateTask: builder.mutation<TaskEntry, Partial<TaskEntry>>({
      query: (updatedTaskData) => ({
        url: `/task/${updatedTaskData.id}`,
        method: 'PUT',
        body: updatedTaskData,
      }),
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/task/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
