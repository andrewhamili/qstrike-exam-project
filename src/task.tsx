import { proxy, useSnapshot } from "valtio";

export enum TaskStatus {
  TODO = "To-Do",
  IN_PROGRESS = "In-progress",
  DONE = "Done",
}

export interface Task {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  isArchived: boolean;
}

export const taskStore = proxy<Task[]>([]);
export const useTask = () => useSnapshot(taskStore);

export const addTask = (t: Task) => {
  console.info("add", t);
  taskStore.push(t);
};
export const archiveTask = (index: number) => {
  const currentTasks = [...taskStore];
  const task = currentTasks[index];
  task.isArchived = true;
  taskStore[index] = task;
};
