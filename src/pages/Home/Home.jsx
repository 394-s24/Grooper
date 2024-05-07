import { Button } from "react-bootstrap";
import "./Home.css";
import Regroup from "../../components/Regroup/Regroup";
import Subgroup from "../../components/Subgroup/Subgroup";

const Home = () => {
  return (
    <div id="home-container">
      <div id="title">GROOPS!</div>
      <div>Upcoming swarm: {new Date().toLocaleString()}</div>
      <div id="subgroups-container">
        <Subgroup
          subgroup={{
            feature: "bricking threes",
            members: [
              { id: 1, name: "Stephen Curry" },
              { id: 2, name: "Klay Thompson" },
            ],
          }}
        />
        <Subgroup
          subgroup={{
            feature: "bricking threes",
            members: [
              { id: 1, name: "Stephen Curry" },
              { id: 2, name: "Klay Thompson" },
            ],
          }}
        />
        <Subgroup
          subgroup={{
            feature: "bricking threes",
            members: [
              { id: 1, name: "Stephen Curry" },
              { id: 2, name: "Klay Thompson" },
            ],
          }}
        />
      </div>
      <div id="home-buttons">
        <Regroup />
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default Home;
