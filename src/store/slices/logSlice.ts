import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { LogEntry } from './../../types/LogEntry';
import { RootState } from '../store';
interface LogState{
	logs:LogEntry[]
}
const initialState:LogState={
	logs:[]
}
const logSlice=createSlice({
	name:'logs',
	initialState,
	reducers:{
		addAllLogs: (state, action: PayloadAction<LogEntry[]>) => {
      const uniqueLogs = action.payload.filter(
        (log, index, self) =>
          self.findIndex((l) => l.id === log.id) === index
      );
      state.logs.push(...uniqueLogs);
    },
		addLog:(state,action:PayloadAction<LogEntry>)=>{
			const isDuplicate = state.logs.some((log) => log.id === action.payload.id);
      if (!isDuplicate) {
        state.logs.push(action.payload);
      }
		}
	}
})
export const {addAllLogs,addLog}=logSlice.actions
export const selectLogs=(state:RootState)=>state.logs.logs
export default logSlice.reducer