import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Home.css";
import Subgroup from "../../components/Subgroup/Subgroup";
import CreateGroups from "../../components/CreateGroups/CreateGroups";
import { getDatabase, onValue, ref } from "firebase/database";

const Home = () => {
  const [subgroups, setSubgroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onValue(
      ref(getDatabase(), "swarms/-NxK37qfhhv5HqlXvWQc/subswarms"),
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setSubgroups(Object.values(data));
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div id="home-container">
      <div id="title">GROOPS!</div>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Create Tasks
      </Button>
      <CreateGroups showModal={showModal} setShowModal={setShowModal} />
      <div id="subgroups-container">
        {subgroups.map((subgroup, idx) => (
          <Subgroup key={idx} subgroup={subgroup} />
        ))}
      </div>
      <div id="home-buttons">
        {/* <Button onClick={handleRegroup}>Regroup</Button> */}
      </div>
      {/* <Regroup /> */}
    </div>
  );
};

export default Home;
