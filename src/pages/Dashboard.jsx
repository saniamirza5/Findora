import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ItemCard from "../components/ItemCard";
import "./Dashboard.css";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/api/items");

        setItems(response.data);
      } catch (err) {
        console.error(err);

        setError("Unable to load items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <main className="dashboard-page">

      {/* HERO */}

      <section className="dashboard-hero">
        <div className="hero-content">
          <p className="dashboard-kicker">
            CAMPUS LOST & FOUND ✦
          </p>

          <h1>
            Lost it?
            <br />
            <span>Find it.</span>
          </h1>

          <p>
            A little place on campus where lost things
            find their way home.
          </p>

          <Link
            to="/report"
            className="hero-report-button"
          >
            + Report an Item
          </Link>
        </div>

        <div className="hero-decoration">
          <span>✦</span>
          <span>♡</span>
          <span>✦</span>
        </div>
      </section>

      {/* ITEMS */}

      <section className="dashboard-items">

        <div className="dashboard-section-header">
          <div>
            <p className="section-kicker">
              WHAT'S OUT THERE
            </p>

            <h2>Recent reports</h2>
          </div>

          <span className="item-count">
            {items.length} items
          </span>
        </div>

        {loading && (
          <div className="dashboard-state">
            <span>✦</span>
            <p>Finding things...</p>
          </div>
        )}

        {!loading && error && (
          <div className="dashboard-state error">
            <span>!</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="dashboard-state">
            <span>♡</span>
            <p>No items have been reported yet.</p>

            <Link to="/report">
              Be the first to report one →
            </Link>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="items-grid">
            {items.map((item) => (
              <div key={item.id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        )}

      </section>
    </main>
  );
}

export default Dashboard;