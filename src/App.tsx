import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { DailyTask } from "./pages";
export interface IFormData {
  [key: string]: any;
}

function App() {
  return (
    <div className="App">
      <DailyTask />
    </div>
  );
}

export default App;
