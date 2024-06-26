import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./BottomNavbar.css";

const BottomNavbar = () => {
  const navigate = useNavigate();

  return (
    <div id="bottom-navbar">
      <button onClick={() => navigate("/")}>
        <i className="bi bi-house h2"></i>
      </button>
      <button onClick={() => navigate("/swarm")}>
        <i className="bi bi-clock-history"></i>
      </button>
      <button onClick={() => getAuth().signOut()}>
        <i className="bi bi-box-arrow-right h2"></i>
      </button>
    </div>
  );
};

export default BottomNavbar;
