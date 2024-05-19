import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Home.css";
import Subgroup from "../../components/Subgroup/Subgroup";
import CreateGroups from "../../components/CreateGroups/createGroups";
import { getDatabase, onValue, ref, update } from "firebase/database";
import getUsers from "../../firebase/getUsers";
import Table from "../../components/Table/Table";
import EditMembers from "../../components/EditMembers/EditMembers";

const Home = () => {
  const [subgroups, setSubgroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [names, setNames] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    getUsers().then((users) => {
      setNames(users.map((user) => user.first_name));
    });

    const db = getDatabase();

    const subgroupsRef = ref(db, "swarms/-NxK37qfhhv5HqlXvWQc/subswarms");
    const startTimeRef = ref(db, "swarms/-NxK37qfhhv5HqlXvWQc/start_time");
    const endTimeRef = ref(db, "swarms/-NxK37qfhhv5HqlXvWQc/end_time");

    const unsubscribeSubgroups = onValue(subgroupsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSubgroups(Object.values(data));
      } else {
        setSubgroups([]);
      }
    });

    const unsubscribeStartTime = onValue(startTimeRef, (snapshot) => {
      setStartTime(snapshot.val());
    });

    const unsubscribeEndTime = onValue(endTimeRef, (snapshot) => {
      setEndTime(snapshot.val());
    });

    return () => {
      unsubscribeSubgroups();
      unsubscribeStartTime();
      unsubscribeEndTime();
    };
  }, []);

  const handleStartStop = () => {
    const db = getDatabase();
    const updates = {};

    if (endTime === null) {
      updates["/swarms/-NxK37qfhhv5HqlXvWQc/end_time"] = new Date().toISOString();
    } else {
      updates["/swarms/-NxK37qfhhv5HqlXvWQc/start_time"] = new Date().toISOString();
      updates["/swarms/-NxK37qfhhv5HqlXvWQc/end_time"] = null;
    }

    update(ref(db), updates);
  };

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
        <Button 
        variant={endTime === null ? "danger" : "success"}
        onClick={handleStartStop}>
          {endTime === null ? "Stop Swarm" : "Start Swarm"}
        </Button>
      </div>
      {/* <Regroup /> */}
      <CreateGroups showModal={showModal} setShowModal={setShowModal} names={names}/>
      <EditMembers showModal={showEditModal} setShowModal={setShowEditModal} />
    </div>
  );
};

export default Home;
