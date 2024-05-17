import { proxy } from "valtio";

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

interface Store {
  tasks: Task[];
  newTask: Task;
  addTask: () => void;
}

export const addTask = (tasks: Task[], task: Task): Task[] => [
  ...tasks,
  {
    id: tasks.length > 1 ? tasks[tasks.length - 1].id + 1 : 1,
    name: task.name,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
    isArchived: task.isArchived,
  },
];

const task = proxy<Store>({
  tasks: [],
  newTask: {
    id: 0,
    description: "",
    dueDate: new Date(),
    isArchived: false,
    name: "",
    status: TaskStatus.DONE,
  },
  addTask() {
    task.tasks = addTask(task.tasks, task.newTask);
  },
});

export default task;
