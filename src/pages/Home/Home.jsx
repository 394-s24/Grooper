import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Home.css";
import Subgroup from "../../components/Subgroup/Subgroup";
import CreateGroups from "../../components/CreateGroups/createGroups";
import { getDatabase, onValue, ref } from "firebase/database";
import getUsers from "../../firebase/getUsers";
import Table from "../../components/Table/Table";
import EditMembers from "../../components/EditMembers/EditMembers";

const Home = () => {
  const [subgroups, setSubgroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [names, setNames] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      setNames(users.map((user) => user.first_name));
    });

    const unsubscribe = onValue(
      ref(getDatabase(), "swarms/-NxK37qfhhv5HqlXvWQc/subswarms"),
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setSubgroups(Object.values(data));
        } else {
          setSubgroups([]);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div id="home-container">
      <div id="title">GROOPS!</div>
      <div id="home-buttons">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Create Tasks
        </Button>
      </div>
      <div id="subgroups-container">
        <Table
          names={names}
          title="Members"
          headerButton={
            <Button variant="primary" onClick={() => setShowEditModal(true)}>
              Edit
            </Button>
          }
        />
        {subgroups.map((subgroup, idx) => (
          <Subgroup key={idx} subgroup={subgroup} />
        ))}
      </div>
      <div id="home-buttons">
        {/* <Button onClick={handleRegroup}>Regroup</Button> */}
      </div>
      {/* <Regroup /> */}
      <CreateGroups showModal={showModal} setShowModal={setShowModal} />
      <EditMembers showModal={showEditModal} setShowModal={setShowEditModal} />
    </div>
  );
};

export default Home;
