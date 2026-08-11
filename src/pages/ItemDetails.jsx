import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./ItemDetails.css";

function ItemDetails() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const handleContactUser = async () => {
    if (!item?.user?.id) {
      alert("Unable to identify the item owner.");
      return;
    }

    if (item.user.id === user?.userId) {
      alert("You cannot contact yourself about your own item.");
      return;
    }

    try {
      const response = await api.post(
        "/api/conversations",
        null,
        {
          params: {
            itemId: item.id,
            otherUserId: item.user.id,
          },
        }
      );

      navigate(`/chat/${response.data.id}`);

    } catch (err) {
      console.error(
        "Error creating conversation:",
        err
      );

      alert(
        err.response?.data ||
        "Unable to start conversation. Please try again."
      );
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/api/items/${id}`);
        setItem(response.data);
      } catch (err) {
        console.error("Error loading item:", err);
        setError("Unable to load this item.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <main className="item-details-page">
        <p>Loading item...</p>
      </main>
    );
  }

  if (error || !item) {
    return (
      <main className="item-details-page">
        <p>{error || "Item not found."}</p>

        <Link to="/dashboard">
          ← Back to items
        </Link>
      </main>
    );
  }

  return (
    <main className="item-details-page">

      <Link to="/dashboard" className="back-to-items">
        ← Back to items
      </Link>

      <section className="item-details">

        <div className="details-image">

          <span className="details-category">
            {item.status}
          </span>

          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.itemName}
              className="details-item-image"
            />
          ) : (
            <span className="details-icon">
              📦
            </span>
          )}

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
              className={`details-status ${item.status.toLowerCase()}`}
            >
              {item.status}
            </span>

            <span className="details-date">
              {item.dateReported}
            </span>

          </div>

          <h1>{item.itemName}</h1>

          <div className="details-location">
            <span>📍</span>

            <div>
              <small>
                {item.status === "LOST"
                  ? "LAST SEEN"
                  : "FOUND AT"}
              </small>

              <strong>{item.location}</strong>
            </div>
          </div>

          <div className="details-description">

            <p className="details-label">
              DESCRIPTION
            </p>

            <p>{item.description}</p>

          </div>

          {item.user && (
            <div className="reported-by">

              <div className="user-avatar">
                {item.user.name
                  ? item.user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div>
                <small>REPORTED BY</small>

                <strong>
                  {item.user.name || "User"}
                </strong>
              </div>

            </div>
          )}

          {item.user?.id !== user?.userId && (
            <button
              className="contact-button"
              onClick={handleContactUser}
            >
              💬 Contact User
            </button>
          )}

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