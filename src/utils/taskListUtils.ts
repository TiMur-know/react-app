import {
  useCreateTaskListMutation,
  useDeleteTaskListMutation,
  useGetTaskListsQuery,
  useUpdateTaskListMutation,
} from "../../store/apiSlices/taskListsApi";
import { TaskListEntry } from "../../types/TaskListsEntry";

// Fetch all task lists from the server
export const fetchTaskLists = () => {
  const { data: taskLists = [], error, isLoading } = useGetTaskListsQuery();

  // If loading, you might want to return a loading indicator or handle it differently
  if (isLoading) {
    return { loading: true };
  }

  // Handle error if there's any
  if (error) {
    console.error("Error fetching task lists:", error);
    return { error };
  }

  return { taskLists };
};

// Add a new task list
export const createTaskList = async (newTaskListData: Partial<TaskListEntry>) => {
  try {
    const { data: taskList, error } = await useCreateTaskListMutation(newTaskListData);
    return { taskList, error };
  } catch (error) {
    console.error("Error creating task list:", error);
    return { error };
  }
};

export const updateTaskList = async (updatedTaskListData: Partial<TaskListEntry>) => {
  try {
    const { data: updatedTaskList, error } = await useUpdateTaskListMutation(updatedTaskListData);
    return { updatedTaskList, error };
  } catch (error) {
    console.error("Error updating task list:", error);
    return { error };
  }
};

export const deleteTaskList = async (id: string) => {
  try {
    const { error } = await useDeleteTaskListMutation(id);
    return { error };
  } catch (error) {
    console.error("Error deleting task list:", error);
    return { error };
  }
};
