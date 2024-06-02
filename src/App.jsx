import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import SavedSwarms from "./pages/SavedSwarms/SavedSwarms";
import BottomNavbar from "./components/BottomNavBar/BottomNavBar";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/swarm" element={<SavedSwarms />} />
        </Routes>
        <BottomNavbar />
      </div>
    </Router>
  );
};

export default App;
