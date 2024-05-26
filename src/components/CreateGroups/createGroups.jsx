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

const CreateGroups = ({ showModal, setShowModal, names }) => {
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
      const numberOfGroups = parseInt(value, 10);
      setError("");
      setGroupNames(Array(numberOfGroups).fill(""));
    }
  };

  const handleUpdate = async () => {
    const numberOfGroups = parseInt(numGroups, 10);
    if (groupNames.some((name) => name.trim() === "")) {
      setError("All task names must be filled out.");
      return;
    }
    await createBestGroups("-NxK37qfhhv5HqlXvWQc", groupNames, numberOfGroups);
    setShowModal(false);
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
            <Form.Control as="select" value={numGroups} onChange={handleNumGroupsChange}>
              <option value="">Select number of tasks</option>
              {[...Array(Math.floor(names.length / 2) + 1).keys()]
                .filter(num => num >= 2)
                .map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
            </Form.Control>
          </FormGroup>
          {error && <Alert variant="danger">{error}</Alert>}
          {!error &&
            Array.from({ length: numGroups === "" ? 0 : parseInt(numGroups, 10) }).map(
              (_, index) => (
                <FormGroup key={index} style={{ marginBottom: "15px" }}>
                  <FormLabel>{`Task ${index + 1}:`}</FormLabel>
                  <FormControl
                    type="text"
                    value={groupNames[index] || ""}
                    onChange={(e) => handleGroupChange(index, e)}
                  />
                </FormGroup>
              )
            )}
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
