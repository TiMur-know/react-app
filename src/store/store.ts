import { configureStore } from "@reduxjs/toolkit"
import taskSlice from "./slices/taskSlice"
import taskListsSlice from "./slices/taskListSlice"
import logSlice from "./slices/logSlice"
import { taskListsApi } from "./apiSlices/taskListsApi"
import { tasksApi } from "./apiSlices/tasksApi"
import { logsApi } from "./apiSlices/logsApi"
export const store=configureStore({
	reducer:{
		tasks:taskSlice,
		logs:logSlice,
		taskLists:taskListsSlice,
		[tasksApi.reducerPath]: tasksApi.reducer, 
    [taskListsApi.reducerPath]: taskListsApi.reducer, 
    [logsApi.reducerPath]: logsApi.reducer, 
	},
	middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
			ignoredActions: ['TYPE'],
      ignoredActionPaths: ['property'],
      ignoredPaths: ['reducer.property']
    }).concat(tasksApi.middleware,
      taskListsApi.middleware,
      logsApi.middleware),
})
export type RootState= ReturnType<typeof store.getState>
export type AppDispath=typeof store.dispatch
