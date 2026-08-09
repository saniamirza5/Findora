import { Link, useParams } from "react-router-dom";
import "./ItemDetails.css";

const mockItem = {
  id: 1,
  itemName: "Blue Backpack",
  category: "BAG",
  status: "LOST",
  location: "Central Library",
  date: "08 Aug 2026",
  description:
    "A blue backpack was lost near the central library. It has a small keychain attached to the front pocket.",
  reportedBy: "Sania",
  icon: "🎒",
};

function ItemDetails() {
  const { id } = useParams();

  console.log("Viewing item:", id);

  return (
    <main className="item-details-page">
      <Link to="/dashboard" className="back-link">
        ← Back to items
      </Link>

      <section className="item-details">
        <div className="details-image">
          <span className="details-category">
            {mockItem.category}
          </span>

          <span className="details-icon">
            {mockItem.icon}
          </span>

          <div className="image-decoration decoration-star">
            ✦
          </div>

          <div className="image-decoration decoration-heart">
            ♡
          </div>
        </div>

        <div className="details-content">
          <div className="details-top">
            <span
              className={`details-status ${mockItem.status.toLowerCase()}`}
            >
              {mockItem.status}
            </span>

            <span className="details-date">
              {mockItem.date}
            </span>
          </div>

          <h1>{mockItem.itemName}</h1>

          <div className="details-location">
            <span>📍</span>
            <div>
              <small>LAST SEEN</small>
              <strong>{mockItem.location}</strong>
            </div>
          </div>

          <div className="details-description">
            <p className="details-label">DESCRIPTION</p>

            <p>{mockItem.description}</p>
          </div>

          <div className="reported-by">
            <div className="user-avatar">
              {mockItem.reportedBy.charAt(0)}
            </div>

            <div>
              <small>REPORTED BY</small>
              <strong>{mockItem.reportedBy}</strong>
            </div>
          </div>

          <button className="contact-button">
            💬 Contact User
          </button>
        </div>
      </section>

      <section className="details-help">
        <span>✦</span>

        <div>
          <h3>Think this is yours?</h3>
          <p>
            Contact the person who reported it and
            arrange a safe way to reconnect.
          </p>
        </div>
      </section>
    </main>
  );
}

export default ItemDetails;