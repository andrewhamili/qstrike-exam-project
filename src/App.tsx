import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { DailyTask } from "./pages";
import { useProxy } from "valtio/utils";

import task from "./task";

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

export interface IFormData {
  [key: string]: any;
}

function App() {
  const snapshot = useProxy(task);
  return (
    <div className="App">
      <DailyTask />
      <button
        onClick={() => {
          task.newTask = {
            id: 0,
            name: "name",
            description: "description",
            status: TaskStatus.TODO,
            dueDate: new Date(),
            isArchived: false,
          };

          task.addTask();
        }}
      >
        New
      </button>
    </div>
  );
}

export default App;
