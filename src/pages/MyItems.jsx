import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import "./MyItems.css";

const myItems = [
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
    id: 5,
    itemName: "Silver Watch",
    category: "ACCESSORY",
    status: "FOUND",
    location: "Block B",
    date: "04 Aug 2026",
    icon: "⌚",
  },
];

function MyItems() {
  return (
    <main className="my-items-page">
      <section className="my-items-header">
        <div>
          <p className="my-items-kicker">
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

        <div className="my-items-grid">
          {myItems.map((item) => (
            <div className="my-item-wrapper" key={item.id}>
              <ItemCard item={item} />

              <div className="item-actions">
                <Link
                  to={`/items/${item.id}`}
                  className="edit-item"
                >
                  View
                </Link>

                <button className="delete-item">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default MyItems;