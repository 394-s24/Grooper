import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, FormLabel, FormControl, Modal } from "react-bootstrap";
import "./Home.css";
import Regroup from "../../components/Regroup/Regroup";
import Subgroup from "../../components/Subgroup/Subgroup";
import getSwarm from "./getSwarm";
import getUsers from "./getUsers";
import setInitialSubgroup from "./setInitialSubgroup";


const initialSubgroups = [
  {
    id: 1,
    feature: "bricking threes",
    members: [
      { id: 1, name: "Stephen Curry" },
      { id: 2, name: "Klay Thompson" },
    ],
  },
  {
    id: 2,
    feature: "bricking threes",
    members: [
      { id: 3, name: "Kevin Durant" },
      { id: 4, name: "LeBron James" },
    ],
  },
  {
    id: 3,
    feature: "bricking threes",
    members: [
      { id: 5, name: "Giannis Antetokounmpo" },
      { id: 6, name: "Stephen Curry" },
    ],
  }
];

const randomNames = ["Stephen Curry", "Klay Thompson", "Kevin Durant", "LeBron James", "Giannis Antetokounmpo"];

const Home = () => {
  const [subgroups, setSubgroups] = useState([]);
  const [swarm, setSwarm] = useState(null);
  const [users, setUsers] = useState([]);

  const [numGroups, setNumGroups] = useState(0);
  const [maxGroups, setMaxGroups] = useState(0);
  const [groupNames, setGroupNames] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // getSwarm().then((swarm) => setSwarm(swarm));
    getUsers().then((users) => {
      setUsers(users);
      setMaxGroups(users.length);
      setSubgroups([setInitialSubgroup(users)]);
      setNumGroups(1);
    });
    
  }, []);


  const handleRegroup = () => {
    console.log("Regroup button clicked");
    // console.log(GroupAssignment());
    // Shuffle the array of random names
    const shuffledNames = randomNames.sort(() => Math.random() - 0.5);
  
    // Calculate the number of members per subgroup
    const membersPerSubgroup = Math.ceil(randomNames.length / initialSubgroups.length);
  
    // Distribute shuffled names evenly among subgroups and assign unique IDs to each member
    const shuffledSubgroups = initialSubgroups.map((subgroup) => ({
      id: subgroup.id,
      feature: subgroup.feature,
      members: shuffledNames
        .slice(subgroup.id * membersPerSubgroup, (subgroup.id + 1) * membersPerSubgroup)
        .map((name, index) => ({ id: index + 1, name })) // Assign unique IDs to each member
    }));
  
    setSubgroups(shuffledSubgroups);
  };

  const handleGroupChange = (index, e) => {
    const newSubgroups = [...initialSubgroups];
    newSubgroups[index].feature = e.target.value;
    setSubgroups(newSubgroups);
  };

  const handleNumGroupsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setNumGroups(value);
      const newSubgroups = [...initialSubgroups];
      while (newSubgroups.length < value) {
        newSubgroups.push({ id: newSubgroups.length + 1, feature: `Group ${newSubgroups.length + 1}`, members: [] });
      }
      if (newSubgroups.length > value) {
        newSubgroups.splice(value);
      }
      setSubgroups(newSubgroups);
    }
  };

  const handleUpdate = () => {
    handleRegroup();
    setShowModal(false);
  };

  return (
    <div id="home-container">
      <div id="title">GROOPS!</div>
      <Button variant="primary" onClick={() => setShowModal(true)}>Set Groups</Button>
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
                <FormControl type="text" value={initialSubgroups[index] ? initialSubgroups[index].feature : `Group ${index + 1}`} onChange={(e) => handleGroupChange(index, e)} />
              </FormGroup>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
      
      <div id="subgroups-container">
        {subgroups.map((subgroup) => (
          <Subgroup key={subgroup.id} subgroup={subgroup} />
        ))}
      </div>
      <div id="home-buttons">
        <Button onClick={handleRegroup}>Regroup</Button>
      </div>
      <Regroup/>
    </div>
  );
};

export default Home;
