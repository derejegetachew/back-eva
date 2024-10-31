import { Route, Routes } from "react-router-dom";
// import './App.css';
import Homee from "./pages/Homee";
import Login from "./pages/Login";
import Registor from "./pages/Registor";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homee />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registor" element={<Registor />} />
      </Routes>
    </div>
  );
}

export default App;
