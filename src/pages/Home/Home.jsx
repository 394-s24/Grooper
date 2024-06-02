import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Home.css";
import Subgroup from "../../components/Subgroup/Subgroup";
import CreateGroups from "../../components/CreateGroups/createGroups";
import { getDatabase, onValue, ref, update } from "firebase/database";
import getUsers from "../../firebase/getUsers";
import Table from "../../components/Table/Table";
import EditMembers from "../../components/EditMembers/EditMembers";
import { setData, pushData } from "../../firebase/utils";
import getCurrSwarm from "./getSwarm";

const Home = () => {
  const [subgroups, setSubgroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [names, setNames] = useState([]);
  const [currSwarm, setCurrSwarm] = useState(null);

  useEffect(() => {
    getUsers().then((users) => {
      setNames(users.map((user) => user.first_name));
    });

    const db = getDatabase();
    const currentSwarmRef = ref(db, `currentSwarm`);

    const unsubscribeCurrentSwarm = onValue(currentSwarmRef, (snapshot) => {
      if (!snapshot.exists()) {
        setCurrSwarm(null);
        return;
      }

      getCurrSwarm(snapshot.val()).then((currSwarm) =>
        setCurrSwarm({ id: snapshot.val(), ...currSwarm })
      );
    });

    return () => {
      unsubscribeCurrentSwarm();
    };
  }, []);

  const started = currSwarm !== null;

  const handleStartStop = async () => {
    if (started) {
      setData(`swarms/${currSwarm.id}/end_time`, new Date().toISOString());
      setData("currentSwarm", null);
      setSubgroups([]);
    }
  };

  return (
    <div id="home-container">
      <div id="title">GROOPER</div>
      <div id="home-buttons">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Create Tasks
        </Button>
      </div>
      <div id="subgroups-container">
        <Table
          names={names}
          title="Members"
        />
        {currSwarm?.subswarms?.map((subgroup, idx) => (
          <Subgroup key={idx} subgroup={subgroup} />
        ))}
      </div>
      <div id="home-buttons">
        {currSwarm?.subswarms?.length > 0 && (
          <Button
            variant={started === true ? "danger" : "success"}
            onClick={handleStartStop}
          >
            {started === true ? "Stop Swarm" : "Start Swarm"}
          </Button>
        )}
      </div>
      <CreateGroups
        showModal={showModal}
        setShowModal={setShowModal}
        names={names}
      />
      <EditMembers showModal={showEditModal} setShowModal={setShowEditModal} />
    </div>
  );
};

export default Home;
