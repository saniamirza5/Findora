import { Link } from "react-router-dom";
import "./ItemCard.css";

function ItemCard({ item }) {
  const statusClass = item.status.toLowerCase();

  return (
    <article className={`item-card ${statusClass}`}>
      <div className="item-image">
        <span className="item-category">
          {item.category}
        </span>

        <span className="item-image-placeholder">
          {item.icon}
        </span>
      </div>

      <div className="item-card-content">
        <div className="item-card-top">
          <h3>{item.itemName}</h3>

          <span className={`status-badge ${statusClass}`}>
            {item.status}
          </span>
        </div>

        <p className="item-location">
          📍 {item.location}
        </p>

        <p className="item-date">
          {item.date}
        </p>

        <Link
          to={`/items/${item.id}`}
          className="item-view-button"
        >
          View item →
        </Link>
      </div>
    </article>
  );
}

export default ItemCard;