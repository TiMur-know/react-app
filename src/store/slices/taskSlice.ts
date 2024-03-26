import { createSlice } from "@reduxjs/toolkit"
interface TaskState{
	
}
const initialState:TaskState={

}
export const taskSlice=createSlice({
	name:'task',
	initialState,
	reducers:{
		addTask:(),
		editTask:(),
		deleteTask:(),

	}
})
export const {}=taskSlice.actions

export default taskSlice.reducer