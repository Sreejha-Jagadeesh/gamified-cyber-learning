// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/login">Profile</Link>
      <a href="http://localhost:3000/" target="_self">CyberShield</a>
      <Link to="/community">Community</Link>
      <Link to="/selfdefense">Self Defense</Link>
      <Link to="/">SOS</Link> {/* Added the SOS button here */}
    </nav>
  );
}
