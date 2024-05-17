import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home/Home";
// import SavedSwarms from "./pages/SavedSwarms/SavedSwarms"

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
