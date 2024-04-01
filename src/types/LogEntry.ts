export interface LogEntry {
	id?:number,

	message: string;
	timestamp: Date;
	primaryWords?: string[]; 
	secondaryWords?: string[];
	task_ids?:string[]
}