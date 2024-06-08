import { proxy, useSnapshot } from "valtio";
import { Task, TaskStatus } from "./task";

export interface Store {
  tasks: Task[];
}

export let store = proxy<Store>({ tasks: [] });
export const useStore = () => useSnapshot(store);
export type { Task };

  export { TaskStatus };

