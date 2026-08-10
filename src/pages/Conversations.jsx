import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Conversations.css";

function Conversations() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await api.get("/api/conversations");

        setConversations(response.data);
      } catch (err) {
        console.error("Error loading conversations:", err);
        setError("Unable to load your conversations.");
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return (
    <main className="conversations-page">

      <section className="conversations-hero">
        <div>
          <p className="section-kicker">
            FINDORA MESSAGES ✦
          </p>

          <h1>
            Let's
            <br />
            <span>talk.</span>
          </h1>

          <p>
            Connect with people who might help
            reunite an item with its owner.
          </p>
        </div>

        <div className="message-decoration">
          💬
        </div>
      </section>

      <section className="conversations-content">

        <div className="conversations-title">
          <div>
            <p className="section-kicker">
              YOUR CONVERSATIONS
            </p>

            <h2>Messages</h2>
          </div>

          <span className="conversation-count">
            {conversations.length}
          </span>
        </div>

        {loading && (
          <p>Loading conversations...</p>
        )}

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          conversations.length === 0 && (
            <p>
              You don't have any conversations yet.
            </p>
          )}

        {!loading &&
          !error &&
          conversations.length > 0 && (
            <div className="conversation-list">

              {conversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  to={`/chat/${conversation.id}`}
                  className="conversation-card"
                >

                  <div className="conversation-avatar">
                    {getOtherUserInitial(conversation)}
                  </div>

                  <div className="conversation-main">

                    <div className="conversation-name-row">

                      <h3>
                        {getOtherUserName(conversation)}
                      </h3>

                      <span>
                        {formatDate(
                          conversation.createdAt
                        )}
                      </span>

                    </div>

                    <p className="conversation-item">
                      ✦{" "}
                      {conversation.item?.itemName ||
                        "Item"}
                    </p>

                    <p className="conversation-message">
                      Open conversation →
                    </p>

                  </div>

                  <span className="conversation-arrow">
                    →
                  </span>

                </Link>
              ))}

            </div>
          )}

      </section>
    </main>
  );
}

function getOtherUser(conversation) {
  /*
   * The exact field names depend on your
   * Conversation entity.
   *
   * We handle the common possibilities here.
   */
  return (
    conversation.otherUser ||
    conversation.user ||
    conversation.participant ||
    conversation.receiver ||
    null
  );
}

function getOtherUserName(conversation) {
  const user = getOtherUser(conversation);

  return user?.name || "User";
}

function getOtherUserInitial(conversation) {
  const name = getOtherUserName(conversation);

  return name.charAt(0).toUpperCase();
}

function formatDate(date) {
  if (!date) return "";

  try {
    return new Date(date).toLocaleDateString();
  } catch {
    return "";
  }
}

export default Conversations;