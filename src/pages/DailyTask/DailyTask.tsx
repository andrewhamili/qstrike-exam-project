import React from "react";
import { IFormData } from "../../App";

import { store, useStore, Task, TaskStatus } from "./../../store";
import {
  Badge,
  Button,
  Table,
} from "react-bootstrap";
import FilterModal from "./FilterModal";
import NewTaskModal from "./NewTaskModal";

interface Props {}

export interface FilterObject {
  taskStatus: TaskStatus | null;
  name: string;
  description: string;
  isArchived: boolean | null;
}

export const defaultFilter = {
  taskStatus: null,
  name: "",
  description: "",
  isArchived: null,
};

const DailyTask: React.FC<Props> = (props) => {
  let snap = useStore();

  const [filter, setFilter] = React.useState<FilterObject>(defaultFilter);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = React.useState(false);
  const [data, setData] = React.useState<Task[]>([]);
  const archiveTask = (index: number) => {
    let currentTasks = snap.tasks;

    store.tasks = currentTasks.map((task, idx) => {
      let t = { ...task };
      if (idx === index) t.isArchived = !t.isArchived;
      return t;
    });
  };

  const sortedAndFiltered = () => {
    console.log(filter);
    let sortedAndFiltered = snap.tasks.toSorted(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );
    sortedAndFiltered =
      filter.taskStatus !== null
        ? sortedAndFiltered.filter((obj) => obj.status === filter.taskStatus)
        : sortedAndFiltered;
    sortedAndFiltered = sortedAndFiltered.filter(
      (obj) =>
        obj.name.toLowerCase().includes(filter.name) &&
        obj.description.toLowerCase().includes(filter.description)
    );
    sortedAndFiltered =
      filter.isArchived !== null
        ? sortedAndFiltered.filter(
            (obj) => obj.isArchived === filter.isArchived
          )
        : sortedAndFiltered;
    setData(sortedAndFiltered);

    return sortedAndFiltered;
  };

  React.useEffect(() => {
    sortedAndFiltered();
  }, [filter, snap]);

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
                      <Badge bg={"danger"} onClick={() => archiveTask(idx)}>
                        Unarchive
                      </Badge>
                    ) : (
                      <Badge bg="primary" onClick={() => archiveTask(idx)}>
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
      <p>{`${data.length} of ${snap.tasks.length} tasks shown`}</p>
    </>
  );
};
export default DailyTask;
