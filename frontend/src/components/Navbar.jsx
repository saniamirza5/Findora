import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn, logout, user } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="navbar-login">
              Log in
            </Link>

            <Link
              to="/register"
              className="navbar-signup"
            >
              Join Findora ✦
            </Link>
          </>
        ) : (
          <Link
            to="/profile"
            className="navbar-user"
          >
            Hi, {user?.name || "there"}!
          </Link>
        )}

      </div>

    </header>
  );
}

export default Navbar;