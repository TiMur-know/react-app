export interface TaskEntry {
	id?: string
	name: string,
	description: string,
	date: Date,
	priority: 'Low'|'Medium'|'High'|string,
	taskListName?:string,
	logs?: string[];
}
