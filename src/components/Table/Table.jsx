import "./Table.css";

const Table = ({ title, names, headerButton }) => {
  return (
    <div className="table-container">
      <div className="table-feature">
        <h2>{title}</h2>
        <div className="table-button">{headerButton}</div>
      </div>
      <div>
        {names.map((name, idx) => (
          <div key={idx}>{name}</div>
        ))}
      </div>
    </div>
  );
};

export default Table;
