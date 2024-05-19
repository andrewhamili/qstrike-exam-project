import React from "react";
import { IFormData } from "../../App";

import task, { Task, TaskStatus } from "../../task";
import { useProxy } from "valtio/utils";
import { useSnapshot } from "valtio";
import {
  Button,
  FloatingLabel,
  Form,
  FormGroup,
  Modal,
  Tab,
  Table,
} from "react-bootstrap";
import FilterModal from "./FilterModal";
import NewTaskModal from "./NewTaskModal";

interface Props {}

const DailyTask: React.FC<Props> = (props) => {
  const snapshot = useProxy(task);

  const [statusFilter, setStatusFilter] = React.useState<TaskStatus | null>(
    null
  );
  const [archiveFilter, setArchiveFilter] = React.useState<boolean | null>(
    null
  );

  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = React.useState(false);

  const sortedAndFiltered = (): Task[] => {
    let sorted = [...snapshot.tasks].sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );
    return sorted;
  };

  return (
    <>
      <FilterModal
        showFilterModal={showFilterModal}
        onHide={() => setShowFilterModal(false)}
      />
      <NewTaskModal
        show={showNewTaskModal}
        onHide={() => setShowNewTaskModal(false)}
      />
      <span>
        <Button onClick={() => setShowFilterModal(true)}>Filter</Button>
        <Button onClick={() => setShowNewTaskModal(true)}>New</Button>
      </span>
      <Table bordered striped hover>
        {sortedAndFiltered().length > 0 ? (
          <>
            <thead>
              <tr>
                {Object.keys(sortedAndFiltered()[0]).map((header, idx) => (
                  <th key={idx}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedAndFiltered().map((task, idx) => (
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
    </>
  );
};
export default DailyTask;
