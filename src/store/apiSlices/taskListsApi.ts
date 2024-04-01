import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskListEntry } from '../../types/TaskListsEntry';

const BASE_URL=import.meta.env.VITE_API
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL+'/task-lists' }); 

export const taskListsApi = createApi({
  reducerPath: 'taskListsApi',
  baseQuery,
  endpoints: (builder) => ({
    getTaskLists: builder.query<TaskListEntry[], void>({
      query: () => '/'
    }),
    getTaskListById: builder.query<TaskListEntry, string>({
      query: (id) => `/task-list/${id}`,
    }),
    createTaskList: builder.mutation<TaskListEntry, Partial<TaskListEntry>>({
      query: (newTaskListData) => ({
        url: '/',
        method: 'POST',
        body: newTaskListData,
      }),
    }),
    updateTaskList: builder.mutation<TaskListEntry, Partial<TaskListEntry>>({
      query: (updatedTaskListData) => ({
        url: `/task-list/${updatedTaskListData.id}`,
        method: 'PUT',
        body: updatedTaskListData,
      }),
    }),
    deleteTaskList: builder.mutation<void, string>({
      query: (id) => ({
        url: `/task-list/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTaskListsQuery,
  useGetTaskListByIdQuery,
  useCreateTaskListMutation,
  useUpdateTaskListMutation,
  useDeleteTaskListMutation,
} = taskListsApi;
