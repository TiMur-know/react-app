export interface LogEntry {
	task_id:string
	message: string;
	timestamp: Date;
	primaryWords?: string[]; 
	secondaryWords?: string[];
}