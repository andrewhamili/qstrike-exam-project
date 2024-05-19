import React from "react";
import { Button, FloatingLabel, Form, FormGroup, Modal } from "react-bootstrap";
import { snapshot } from "valtio";
import { Task, TaskStatus } from "../../task";
import { useFormik } from "formik";
import { defaultFilter, FilterObject } from "./DailyTask";

interface Props {
  showFilterModal: boolean;
  onHide: () => void;
  setFilter: React.Dispatch<React.SetStateAction<FilterObject>>;
}

export interface IFormData {
  [key: string]: any;
}

const FilterModal: React.FC<Props> = (props) => {
  const formik = useFormik<FilterObject>({
    initialValues: {
      taskStatus: null,
      name: "",
      isArchived: false,
    },
    onSubmit: (values) => {
      console.log(values);
      props.setFilter(values);
    },
  });

  return (
    <Modal show={props.showFilterModal} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Filter tasks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-2">
            <FloatingLabel label="Name">
              <Form.Control
                type="text"
                name="name"
                onChange={formik.handleChange}
              />
            </FloatingLabel>
          </FormGroup>
          <FormGroup className="mb-2">
            <FloatingLabel label="Status">
              <Form.Select name="taskStatus" onChange={formik.handleChange}>
                <option hidden> </option>
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
            <Form.Check
              label="Archive?"
              name="isArchived"
              onChange={formik.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Filter</Button>
            <Button onClick={() => props.setFilter(defaultFilter)} variant="danger">
              Reset
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;
