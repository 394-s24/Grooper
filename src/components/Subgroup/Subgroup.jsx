import { useEffect, useState } from "react";
import "./Subgroup.css";
import getNamesFromIds from "../../firebase/getNamesFromIds";

// feature will be the firebase object
const Subgroup = ({ subgroup }) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    getNamesFromIds(subgroup.members).then((names) => {
      setNames(names);
    });
  }, [subgroup.members]);

  return (
    <div className="subgroup-container">
      <h2 className="subgroup-feature">{subgroup.topic}</h2>
      {names.map((name, idx) => (
        <div key={idx}>{name}</div>
      ))}
    </div>
  );
};

export default Subgroup;
