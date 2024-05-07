import "./Subgroup.css";

// feature will be the firebase object
const Subgroup = ({ subgroup }) => {
  return (
    <div className="subgroup-container">
      <h2 className="subgroup-feature">{subgroup.feature}</h2>
      {subgroup.members.map((member) => (
        <div key={member.id}>{member.name}</div>
      ))}
    </div>
  );
};

export default Subgroup;
