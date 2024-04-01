import { RootState } from '../store';
import { TaskEntry } from './../../types/TaskEntry';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface TaskState {
  tasks:TaskEntry[]
	activeTaskListId?:string
}
const initialState:TaskState={
	tasks:[]
}
export const taskSlice=createSlice({
	name:'tasks',
	initialState,
	reducers:{
		addAllTasks: (state, action: PayloadAction<TaskEntry[]>) => {
      const uniqueTasks = action.payload.filter(
        (task, index, self) => self.findIndex((t) => t.id === task.id) === index
      );
      state.tasks.push(...uniqueTasks);
    },
		addTask:(state,action:PayloadAction<TaskEntry>)=>{
			const isDuplicate = state.tasks.some((task) => task.id === action.payload.id);
      if (!isDuplicate) {
        state.tasks.push(action.payload);
      }
		},
		updateTask: (state, action: PayloadAction<TaskEntry>) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = action.payload;
      }
    },
		deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks=state.tasks.filter((task)=>task.id!==action.payload)
    },

	}
})
export const {addAllTasks,addTask,updateTask,deleteTask}=taskSlice.actions
export const selectTasks = (state: RootState) => state.tasks.tasks;
export default taskSlice.reducer