import "./Subgroup.css";

// feature will be the firebase object
const Subgroup = ({ subgroup }) => {
  return (
    <div className="subgroup-container">
      <h2 className="subgroup-feature">{subgroup.topic}</h2>
      {subgroup.members.map((member, id) => (
        <div key={id}>{member}</div>
      ))}
    </div>
  );
};

export default Subgroup;
