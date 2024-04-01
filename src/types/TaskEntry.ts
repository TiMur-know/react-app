export interface TaskEntry {
	id?: number
	name: string,
	description: string,
	date: Date,
	priority: 'Low'|'Medium'|'High'|string,
	taskListName?:string,
	logs?: string[];
}
