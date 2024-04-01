export interface LogEntry {
	id?:string,

	message: string;
	timestamp: Date;
	primaryWords?: string[]; 
	secondaryWords?: string[];
	task_ids?:string[]
}