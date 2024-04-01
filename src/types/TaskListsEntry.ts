import { TaskEntry } from "./TaskEntry";

export interface TaskListEntry {
		id?: string,
		name: string,
		tasks?: TaskEntry[],
}