import React, { useState } from "react";
import { Button, Form, FormGroup, FormLabel, FormControl, Modal } from "react-bootstrap";
import createBestGroups from "./createBestGroups";

const CreateGroups = ({ showModal, setShowModal, users, maxGroups, setSubgroups }) => {
  const [numGroups, setNumGroups] = useState(0);
  const [groupNames, setGroupNames] = useState([]);

  const handleGroupChange = (index, e) => {
    const newGroupNames = [...groupNames];
    newGroupNames[index] = e.target.value;
    setGroupNames(newGroupNames);

    // const newSubgroups = [...initialSubgroups];
    // newSubgroups[index].feature = e.target.value;
    // setSubgroups(newSubgroups);
  };

  const handleNumGroupsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setNumGroups(value);
      setGroupNames(Array(numGroups).fill(""));

      // const newSubgroups = [...initialSubgroups];
      // while (newSubgroups.length < value) {
      //   newSubgroups.push({ id: newSubgroups.length + 1, feature: `Group ${newSubgroups.length + 1}`, members: [] });
      // }
      // if (newSubgroups.length > value) {
      //   newSubgroups.splice(value);
      // }
      // setSubgroups(newSubgroups);
    }
  };

  const handleUpdate = async () => {
    const groups = await createBestGroups({ groupNames, numGroups, users });
    setSubgroups(groups);
    setShowModal(false);
  };

  console.log(groupNames);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Customize Groups</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <FormLabel>Number of Groups:</FormLabel>
            <FormControl type="number" value={numGroups} onChange={handleNumGroupsChange} />
          </FormGroup>
          {Array.from({ length: numGroups }).map((_, index) => (
            <FormGroup key={index}>
              <FormLabel>{`Group ${index + 1} Name:`}</FormLabel>
              <FormControl type="text" onChange={(e) => handleGroupChange(index, e)} />
            </FormGroup>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        <Button variant="primary" onClick={handleUpdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateGroups;
