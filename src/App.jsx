import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import SavedSwarms from "./pages/SavedSwarms/SavedSwarms"; // Make sure this is uncommented
import BottomNavbar from "./components/BottomNavBar/BottomNavBar"; // Adjust the path as needed

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/swarm" element={<SavedSwarms />} />
          {/* Add other routes as needed */}
        </Routes>
        <BottomNavbar />
      </div>
    </Router>
  );
};

export default App;
