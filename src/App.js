import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import ControlPage from "./pages/ControlPage";
import SettingPage from "./pages/SettingPage";
import PhasePage from "./pages/PhasePage";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navbar Section */}
        <div className="navbar_component">
          <Navbar />
        </div>

        {/* Dashboard Section */}
        <div className="dashboard">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/control-panel" element={<ControlPage />} />
            <Route path="/settings" element={<SettingPage />} />
            <Route path="/phases" element={<PhasePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
