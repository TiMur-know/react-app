import { useGetLogsQuery, useCreateLogMutation, useUpdateLogMutation, useDeleteLogMutation } from "../store/apiSlices/logsApi";
import { LogEntry } from "../types/LogEntry";

// Function to fetch logsred
export const fetchLogs = async () => {
	try {
    const { data: logs = [] } = await useGetLogsQuery()
    return logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

// Function to create a log entry
export const createLog = async (newLogData: Partial<LogEntry>) => {
	const { data: log, error } = await useCreateLogMutation(newLogData);

	return { log, error };
};

// Function to update a log entry
export const updateLog = async (updatedLogData: Partial<LogEntry>) => {
	const { data: updatedLog, error } = await useUpdateLogMutation(updatedLogData);

	return { updatedLog, error };
};

// Function to delete a log entry
export const deleteLog = async (id: string) => {
	const { error } = await useDeleteLogMutation(id);

	return { error };
};

// Function to process data (if needed)
export const processData = (data: any): LogEntry[] => {
	const uniqueLogs = data.filter((log: LogEntry, index: number, self: LogEntry[]) => {
		return self.findIndex((l) => l.id === log.id) === index;
	});

	return uniqueLogs;
};
