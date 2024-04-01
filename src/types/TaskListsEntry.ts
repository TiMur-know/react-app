import { TaskEntry } from "./TaskEntry";

export interface TaskListEntry {
	id?: number,
	name: string,
	tasks?: TaskEntry[],
}