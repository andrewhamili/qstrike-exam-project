import React from "react";
import { IFormData } from "../../App";

import task, { Task, TaskStatus } from "../../task";
import { useProxy } from "valtio/utils";
import { useSnapshot } from "valtio";
import {
  Badge,
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

export interface FilterObject {
  taskStatus: TaskStatus | null;
  name: string;
  isArchived: boolean | null;
}

export const defaultFilter = {
  taskStatus: null,
  name: "",
  isArchived: null,
};

const DailyTask: React.FC<Props> = (props) => {
  const snapshot = useProxy(task);

  const [filter, setFilter] = React.useState<FilterObject>(defaultFilter);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = React.useState(false);
  const [data, setData] = React.useState<Task[]>([]);

  const sortedAndFiltered = () => {
    let sortedAndFiltered = [...snapshot.tasks].sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );
    sortedAndFiltered =
      filter.taskStatus !== null
        ? sortedAndFiltered.filter((obj) => obj.status === filter.taskStatus)
        : sortedAndFiltered;
    sortedAndFiltered = sortedAndFiltered.filter((obj) =>
      obj.name.includes(filter.name)
    );
    sortedAndFiltered =
      filter.isArchived !== null
        ? sortedAndFiltered.filter(
            (obj) => obj.isArchived === filter.isArchived
          )
        : sortedAndFiltered;
    setData(sortedAndFiltered);

    console.log("sortedAndFiltered");

    return sortedAndFiltered;
  };

  const updateArchive = (index: number, selectedTask: Task) => {
    if (
      window.confirm(
        `Sure to ${selectedTask.isArchived ? "unarchive" : "archive"} task #${
          selectedTask.id
        }?`
      )
    ) {
      const payload = { ...selectedTask, isArchived: !selectedTask.isArchived };
      const tasks = [...snapshot.tasks];
      tasks[index] = payload;
      task.tasks = tasks;
      sortedAndFiltered();
    }
  };

  React.useEffect(() => {
    sortedAndFiltered();
  }, [filter, snapshot.tasks]);

  return (
    <>
      <FilterModal
        setFilter={setFilter}
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
        {data.length > 0 && (
          <>
            <thead>
              <tr>
                <th>Action</th>
                {Object.keys(data[0]).map((header, idx) => (
                  <th key={idx}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((task, idx) => (
                <tr key={idx}>
                  <td>
                    {task.isArchived ? (
                      <Badge
                        bg={"danger"}
                        onClick={() => updateArchive(idx, task)}
                      >
                        Unarchive
                      </Badge>
                    ) : (
                      <Badge
                        bg="primary"
                        onClick={() => updateArchive(idx, task)}
                      >
                        Archive
                      </Badge>
                    )}
                  </td>
                  <td>{task.id}</td>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.isArchived ? "YES" : "NO"}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </Table>
      <p>{`${data.length} of ${snapshot.tasks.length} tasks shown`}</p>
    </>
  );
};
export default DailyTask;
