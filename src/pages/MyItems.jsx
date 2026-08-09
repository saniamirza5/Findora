import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./MyItems.css";

function MyItems() {
  const { user, isLoggedIn } = useAuth();

  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyItems = async () => {
      if (!user?.userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          `/api/items/user/${user.userId}`
        );

        setMyItems(response.data);
      } catch (err) {
        console.error("Error loading my items:", err);
        setError("Unable to load your reported items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, [user]);

  if (!isLoggedIn) {
    return (
      <main className="my-items-page">
        <section className="my-items-content">
          <h2>Please log in to view your items.</h2>
          <Link to="/login">Login</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="my-items-page">

      <section className="my-items-hero">
        <div>
          <p className="section-kicker">
            YOUR FINDORA ✦
          </p>

          <h1>
            My
            <br />
            <span>items.</span>
          </h1>

          <p>
            Keep track of everything you've reported
            on campus.
          </p>
        </div>

        <Link
          to="/report"
          className="report-new-button"
        >
          + Report Item
        </Link>
      </section>

      <section className="my-items-content">

        <div className="my-items-title">
          <div>
            <p className="section-kicker">
              YOUR REPORTS
            </p>

            <h2>Items you've reported</h2>
          </div>

          <span className="item-count">
            {myItems.length} items
          </span>
        </div>

        {loading && (
          <p>Loading your items...</p>
        )}

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        {!loading && !error && myItems.length === 0 && (
          <div>
            <p>You haven't reported any items yet.</p>

            <Link
              to="/report"
              className="report-new-button"
            >
              + Report Your First Item
            </Link>
          </div>
        )}

        {!loading && !error && myItems.length > 0 && (
          <div className="my-items-grid">
            {myItems.map((item) => (
              <div
                className="my-item-wrapper"
                key={item.id}
              >
                <ItemCard item={item} />

                <div className="item-actions">
                  <Link
                    to={`/items/${item.id}`}
                    className="edit-item"
                  >
                    View
                  </Link>

                  <button
                    className="delete-item"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>
    </main>
  );
}

export default MyItems;