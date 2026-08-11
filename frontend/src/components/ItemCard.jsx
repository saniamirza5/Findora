import { Link } from "react-router-dom";
import "./ItemCard.css";

function ItemCard({ item }) {
  const formattedDate = item.dateReported
    ? new Date(item.dateReported).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const statusClass = item.status
    ? item.status.toLowerCase()
    : "";

  return (
    <article className="item-card">
      <Link
        to={`/items/${item.id}`}
        className="item-card-image"
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.itemName}
          />
        ) : (
          <div className="item-card-no-image">
            <span>♡</span>
            <small>No image</small>
          </div>
        )}

        <span className={`item-status ${statusClass}`}>
          {item.status}
        </span>
      </Link>

      <div className="item-card-content">
        <p className="item-card-location">
          📍 {item.location || "Location not provided"}
        </p>

        <h3>{item.itemName}</h3>

        <p className="item-card-description">
          {item.description || "No description provided."}
        </p>

        <div className="item-card-footer">
          <span>
            {formattedDate}
          </span>

          <Link to={`/items/${item.id}`}>
            View →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;