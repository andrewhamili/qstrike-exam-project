import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { DailyTask } from "./pages";
import { useProxy } from "valtio/utils";

import task, { TaskStatus } from "./task";



export interface IFormData {
  [key: string]: any;
}

function App() {
  const snapshot = useProxy(task);
  return (
    <div className="App">
      <DailyTask />
    </div>
  );
}

export default App;
