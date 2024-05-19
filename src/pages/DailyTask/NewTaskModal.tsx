import React from "react";
import { Button, FloatingLabel, Form, FormGroup, Modal } from "react-bootstrap";
import task, { Task, TaskStatus } from "../../task";
import { useFormik } from "formik";

interface Props {
  show: boolean;
  onHide: () => void;
}

export interface IFormData {
  [key: string]: any;
}

const NewTaskModal: React.FC<Props> = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: TaskStatus.TODO,
      dueDate: new Date(),
      isArchived: false,
    },
    onSubmit: (values) => {
      task.newTask = { ...values, id: 0 };
      task.addTask();
      props.onHide();
    },
  });

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>New task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-2">
            <FloatingLabel label="Name">
              <Form.Control
                required
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
              />
            </FloatingLabel>
          </FormGroup>
          <FormGroup className="mb-2">
            <FloatingLabel label="Description">
              <Form.Control
                required
                type="text"
                id="description"
                name="description"
                onChange={formik.handleChange}
              />
            </FloatingLabel>
          </FormGroup>
          <FormGroup className="mb-2">
            <FloatingLabel label="Status">
              <Form.Select
                required
                name="status"
                id="status"
                onChange={formik.handleChange}
              >
                <option hidden value={""}>
                  ==SELECT==
                </option>
                {Object.values(TaskStatus).map((ts, idx) => {
                  return (
                    <option key={idx} value={ts}>
                      {ts}
                    </option>
                  );
                })}
              </Form.Select>
            </FloatingLabel>
          </FormGroup>
          <FormGroup className="mb-2">
            <FloatingLabel label="Due date">
              <Form.Control
                required
                type="date"
                name="dueDate"
                id="dueDate"
                onChange={formik.handleChange}
              />
            </FloatingLabel>
          </FormGroup>
          <FormGroup className="mb-2">
            <Form.Check
              label="Archived?"
              name="isArchived"
              id="isArchived"
              onChange={formik.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit" className="form-control">
              Add
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewTaskModal;
