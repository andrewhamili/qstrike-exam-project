import React from "react";
import { IFormData, Task, TaskStatus } from "../../App";

import task from "../../task";
import { useProxy } from "valtio/utils";
import { useSnapshot } from "valtio";
import { Tab, Table } from "react-bootstrap";

interface Props {}

const DailyTask: React.FC<Props> = (props) => {
  const snapshot = useProxy(task);

  return (
    <Table bordered striped hover>
      {snapshot.tasks.length > 0 ? (
        <>
          <thead>
            <tr>
              {Object.keys(snapshot.tasks[0]).map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {snapshot.tasks.map((task, idx) => (
              <tr key={idx}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>
                  <input type="checkbox" defaultChecked={task.isArchived} />
                </td>
              </tr>
            ))}
          </tbody>
        </>
      ) : (
        <></>
      )}
    </Table>
  );
};
export default DailyTask;
