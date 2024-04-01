import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from "../store/apiSlices/tasksApi";
import { TaskEntry } from "../types/TaskEntry";

export const fetchTasks = () => {
  const { data: tasks = [], error } = useGetTasksQuery();

  return tasks;
};

export const createTask = async (newTaskData: Partial<TaskEntry>) => {
  const { data: task, error } = await useCreateTaskMutation(newTaskData);

  return task;
};

export const updateTask = async (updatedTaskData: Partial<TaskEntry>) => {
  const { data: updatedTask, error } = await useUpdateTaskMutation(updatedTaskData);

  return updatedTask;
};

export const deleteTask = async (id: string) => {
  const { error } = await useDeleteTaskMutation(id);

};

export const processData = (data: any): TaskEntry[] => {

  const uniqueTasks = data.filter((task: TaskEntry, index: number, self: TaskEntry[]) => {
    return self.findIndex((t) => t.id === task.id) === index;
  });

  return uniqueTasks;
};
