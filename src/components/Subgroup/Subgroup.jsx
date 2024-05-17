import { useEffect, useState } from "react";
import "./Subgroup.css";
import getNamesFromIds from "../../firebase/getNamesFromIds";
import Table from "../Table/Table";

const Subgroup = ({ subgroup }) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    getNamesFromIds(subgroup.members).then((names) => {
      setNames(names);
    });
  }, [subgroup.members]);

  return <Table title={subgroup.topic} names={names} />;
};

export default Subgroup;
