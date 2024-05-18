import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Modal,
  Alert,
} from "react-bootstrap";
import createBestGroups from "./createBestGroups";

const CreateGroups = ({ showModal, setShowModal }) => {
  const [numGroups, setNumGroups] = useState("");
  const [groupNames, setGroupNames] = useState([]);
  const [error, setError] = useState("");

  const handleGroupChange = (index, e) => {
    const newGroupNames = [...groupNames];
    newGroupNames[index] = e.target.value;
    setGroupNames(newGroupNames);
  };

  const handleNumGroupsChange = (e) => {
    const value = e.target.value;
    setNumGroups(value);

    if (value === "") {
      setError("");
      setGroupNames([]);
    } else {
      const numberOfGroups = parseFloat(value);
      if (isNaN(numberOfGroups) || numberOfGroups < 0 || numberOfGroups % 1 != 0) {
        setError("Please enter a valid integer.");
        setGroupNames([]);
      } else {
        setError("");
        setGroupNames(Array(numberOfGroups).fill(""));
      }
    }
  };

  const handleUpdate = async () => {
    const numberOfGroups = parseInt(numGroups, 10);
    if (!isNaN(numberOfGroups) && numberOfGroups >= 0) {
      await createBestGroups("-NxK37qfhhv5HqlXvWQc", groupNames, numberOfGroups);
      setShowModal(false);
    } else {
      setError("Please enter a valid number of tasks.");
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Tasks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup style={{ marginBottom: "15px" }}>
            <FormLabel>Number of Tasks:</FormLabel>
            <FormControl
              type="number"
              value={numGroups}
              onChange={handleNumGroupsChange}
              min="0"
            />
          </FormGroup>
          {error && <Alert variant="danger">{error}</Alert>}
          {!error && Array.from({ length: numGroups === '' ? 0 : parseInt(numGroups, 10) }).map((_, index) => (
            <FormGroup key={index} style={{ marginBottom: "15px" }}>
              <FormLabel>{`Task ${index + 1}:`}</FormLabel>
              <FormControl
                type="text"
                value={groupNames[index] || ""}
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
