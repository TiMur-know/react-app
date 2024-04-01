import { TaskListEntry } from './../../types/TaskListsEntry';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TaskEntry } from '../../types/TaskEntry';

interface TaskListsState {
  taskLists: TaskListEntry[];
}

const initialState: TaskListsState = {
  taskLists: [],
};

export const taskListsSlice = createSlice({
  name: 'taskLists',
  initialState,
  reducers: {
    addAllTaskLists: (state, action: PayloadAction<TaskListEntry[]>) => {
      state.taskLists = [...state.taskLists, ...action.payload];
    },
    addTaskToTaskList: (state, action: PayloadAction<{ taskId: string; taskListId: string }>) => {
			const { taskId, taskListId } = action.payload;
			const taskListIndex = state.taskLists.findIndex((list) => list.id === taskListId);
			if (taskListIndex !== -1) {
				state.taskLists[taskListIndex].tasks.push(taskId);
			}
		},
		addTaskToTaskListTask: (state, action: PayloadAction<{ taskList: TaskListEntry; task: TaskEntry }>) => {
			const { taskList, task } = action.payload;
			const existingListIndex = state.taskLists.findIndex((list) => list.id === taskList.id);
			if (existingListIndex !== -1) {
				state.taskLists[existingListIndex].tasks.push(task);
			}
		},
    addTaskList: (state, action: PayloadAction<TaskListEntry>) => {
      const taskList = action.payload;
      const isDuplicate = state.taskLists.some((list) => list.id === taskList.id);
      if (!isDuplicate) {
        state.taskLists.push(taskList);
      }
    },
    updateTaskList: (state, action: PayloadAction<TaskListEntry>) => {
      const updatedTaskList = action.payload;
      const taskListIndex = state.taskLists.findIndex((list) => list.id === updatedTaskList.id);
      if (taskListIndex !== -1) {
        state.taskLists[taskListIndex] = updatedTaskList;
      }
    },
    deleteTaskList: (state, action: PayloadAction<string>) => {
      state.taskLists = state.taskLists.filter((list) => list.id !== action.payload);
    },
  },

});

export const { addTaskList, updateTaskList, deleteTaskList, addTaskToTaskList, addAllTaskLists, addTaskToTaskListTask } = taskListsSlice.actions;
export const selectTaskLists = (state: RootState) => state.taskLists.taskLists;

export default taskListsSlice.reducer;
