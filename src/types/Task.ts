export interface Task {
	id: string
	name: string,
	description: string,
	date: Date,
	priority: 'Low'|'Medium'|'High',
}
