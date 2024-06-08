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