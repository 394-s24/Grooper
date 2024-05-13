import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Modal,
} from "react-bootstrap";
import createBestGroups from "./createBestGroups";

const CreateGroups = ({ showModal, setShowModal }) => {
  const [numGroups, setNumGroups] = useState(0);
  const [groupNames, setGroupNames] = useState([]);

  const handleGroupChange = (index, e) => {
    const newGroupNames = [...groupNames];
    newGroupNames[index] = e.target.value;
    setGroupNames(newGroupNames);
  };

  const handleNumGroupsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setNumGroups(value);
      setGroupNames(Array(value).fill(""));
    }
  };

  console.log("test");

  const handleUpdate = async () => {
    await createBestGroups("-NxK37qfhhv5HqlXvWQc", groupNames, numGroups);
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Tasks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <FormLabel>Number of Tasks:</FormLabel>
            <FormControl
              type="number"
              value={numGroups}
              onChange={handleNumGroupsChange}
            />
          </FormGroup>
          {Array.from({ length: numGroups }).map((_, index) => (
            <FormGroup key={index}>
              <FormLabel>{`Task ${index + 1}:`}</FormLabel>
              <FormControl
                type="text"
                onChange={(e) => handleGroupChange(index, e)}
              />
            </FormGroup>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroups;
