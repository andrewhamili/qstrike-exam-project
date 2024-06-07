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

export interface Store {
  tasks: Task[];
}

export let store = proxy<Store>({ tasks: [] });
export const useStore = () => useSnapshot(store);
