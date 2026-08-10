import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();

  return (
    <main className="profile-page">

      <section className="profile-hero">

        <p className="section-kicker">
          YOUR FINDORA ✦
        </p>

        <h1>
          Your
          <br />
          <span>profile.</span>
        </h1>

        <p>
          Manage your account information.
        </p>

      </section>

      <section className="profile-card">

        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="profile-info">

          <div className="profile-field">
            <small>NAME</small>
            <strong>
              {user?.name || "Not available"}
            </strong>
          </div>

          <div className="profile-field">
            <small>EMAIL</small>
            <strong>
              {user?.email || "Not available"}
            </strong>
          </div>

          <div className="profile-field">
            <small>USER ID</small>
            <strong>
              {user?.userId || "Not available"}
            </strong>
          </div>

        </div>

        <Link
          to="/my-items"
          className="profile-items-button"
        >
          View My Items →
        </Link>

      </section>

    </main>
  );
}

export default Profile;