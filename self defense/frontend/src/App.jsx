// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Community from "./pages/Community";
import SelfDefense from "./pages/SelfDefense";
import "./index.css";
import SOS from "./pages/SOS";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="main-container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SOS />} />
          <Route path="/community" element={<Community />} />
          <Route path="/selfdefense" element={<SelfDefense />} />
          <Route path="/login" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
