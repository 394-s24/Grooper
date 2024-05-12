import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Home.css";
import Regroup from "../../components/Regroup/Regroup";
// import GroupAssignment from "../../components/Regroup/Regroup";
import Subgroup from "../../components/Subgroup/Subgroup";
import getSwarm from "./getSwarm";
// import GroupAssignment from "../../components/Regroup/AssignGroups";

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
  const [subgroups, setSubgroups] = useState(initialSubgroups);
  const [swarm, setSwarm] = useState(null);
  
  useEffect(() => {
    getSwarm().then((swarm) => setSwarm(swarm));
  }, []);

  console.log(swarm);

  // console.log(GroupAssignment());
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
  
  

  return (
    <div id="home-container">
      <div id="title">GROOPS!</div>
      <div>Upcoming swarm: {new Date().toLocaleString()}</div>
      <div id="subgroups-container">
        {subgroups.map((subgroup) => (
          <Subgroup key={subgroup.id} subgroup={subgroup} />
        ))}
      </div>
      <div id="home-buttons">
        <Button onClick={handleRegroup}>Regroup</Button>
        <Button>Save</Button>
      </div>
      <Regroup/>
    </div>
  );
};

export default Home;
