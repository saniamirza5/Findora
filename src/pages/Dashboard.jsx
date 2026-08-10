import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [search, setSearch] = useState("");

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

  const filteredItems = items.filter((item) => {
    const matchesFilter =
      activeFilter === "ALL" ||
      item.status === activeFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      item.itemName
        ?.toLowerCase()
        .includes(searchText) ||
      item.location
        ?.toLowerCase()
        .includes(searchText);

    return matchesFilter && matchesSearch;
  });

  return (
    <main className="dashboard">

      {/* HERO */}

      <section className="dashboard-hero">

        <div className="dashboard-heading">

          <p className="dashboard-kicker">
            CAMPUS LOST & FOUND ✦
          </p>

          <h1>
            What's missing?
            <br />
            <span>Maybe it's here.</span>
          </h1>

          <p className="dashboard-description">
            Search through items reported by your
            campus community.
          </p>

          <div className="dashboard-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search an item or location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

      </section>

      {/* ITEMS */}

      <section className="items-section">

        <div className="items-header">

          <div>

            <p className="section-kicker">
              RECENTLY REPORTED
            </p>

            <h2>
              Items around campus
            </h2>

          </div>

          <div className="filter-buttons">

            {[
              "ALL",
              "LOST",
              "FOUND",
              "RETURNED",
            ].map((filter) => (

              <button
                key={filter}
                type="button"
                className={
                  activeFilter === filter
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>

            ))}

          </div>

        </div>

        {loading && (
          <div className="empty-results">
            <span>✦</span>

            <h3>
              Finding things...
            </h3>

            <p>
              Loading reported items.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="empty-results">
            <span>!</span>

            <h3>
              Something went wrong
            </h3>

            <p>
              {error}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          filteredItems.length > 0 && (

            <div className="item-grid">

              {filteredItems.map((item) => (

                <ItemCard
                  key={item.id}
                  item={item}
                />

              ))}

            </div>

          )}

        {!loading &&
          !error &&
          filteredItems.length === 0 && (

            <div className="empty-results">

              <span>✦</span>

              <h3>
                No items found
              </h3>

              <p>
                Try another search or filter.
              </p>

            </div>

          )}

      </section>

    </main>
  );
}

export default Dashboard;