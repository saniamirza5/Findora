import { useState } from "react";
import ItemCard from "../components/ItemCard";
import "./Dashboard.css";

const mockItems = [
  {
    id: 1,
    itemName: "Blue Backpack",
    category: "BAG",
    status: "LOST",
    location: "Central Library",
    date: "08 Aug 2026",
    icon: "🎒",
  },
  {
    id: 2,
    itemName: "Black Wallet",
    category: "WALLET",
    status: "FOUND",
    location: "College Canteen",
    date: "07 Aug 2026",
    icon: "👛",
  },
  {
    id: 3,
    itemName: "Wireless Earbuds",
    category: "ELECTRONICS",
    status: "LOST",
    location: "Block A",
    date: "06 Aug 2026",
    icon: "🎧",
  },
  {
    id: 4,
    itemName: "Silver Keys",
    category: "KEYS",
    status: "FOUND",
    location: "Main Gate",
    date: "05 Aug 2026",
    icon: "🔑",
  },
];

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredItems = mockItems.filter((item) => {
    const matchesFilter =
      activeFilter === "ALL" ||
      item.status === activeFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      item.itemName.toLowerCase().includes(searchText) ||
      item.location.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  return (
    <main className="dashboard">
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
        </div>

        <div className="dashboard-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search an item or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="items-section">
        <div className="items-header">
          <div>
            <p className="section-kicker">
              RECENTLY REPORTED
            </p>

            <h2>Items around campus</h2>
          </div>

          <div className="filter-buttons">
            {["ALL", "LOST", "FOUND", "RETURNED"].map(
              (filter) => (
                <button
                  key={filter}
                  className={
                    activeFilter === filter
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="item-grid">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <span>✦</span>

            <h3>No items found</h3>

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