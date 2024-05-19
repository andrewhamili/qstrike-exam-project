import React from "react";
import { FloatingLabel, Form, FormGroup, Modal } from "react-bootstrap";
import { snapshot } from "valtio";
import { TaskStatus } from "../../task";

interface Props {
  showFilterModal: boolean;
  onHide: () => void;
}

const FilterModal: React.FC<Props> = (props) => {
  return (
    <Modal show={props.showFilterModal} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>Filter tasks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup className="mb-2">
            <FloatingLabel label="Status">
              <Form.Select>
                {Object.values(TaskStatus).map((ts, idx) => {
                  return (
                    <option key={idx} value={idx}>
                      {ts}
                    </option>
                  );
                })}
              </Form.Select>
            </FloatingLabel>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;
