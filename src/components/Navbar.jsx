import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        <span>✦</span>
        Findora
      </Link>

      <nav className="navbar-links">
        <Link
          to="/dashboard"
          className={isActive("/dashboard") ? "active" : ""}
        >
          Browse
        </Link>

        <Link
          to="/report"
          className={isActive("/report") ? "active" : ""}
        >
          Report Item
        </Link>

        <Link
          to="/my-items"
          className={isActive("/my-items") ? "active" : ""}
        >
          My Items
        </Link>

        <Link
          to="/conversations"
          className={
            isActive("/conversations") ? "active" : ""
          }
        >
          Messages
        </Link>
      </nav>

      <div className="navbar-actions">
        <Link to="/login" className="navbar-login">
          Log in
        </Link>

        <Link to="/register" className="navbar-signup">
          Join Findora ✦
        </Link>
      </div>
    </header>
  );
}

export default Navbar;