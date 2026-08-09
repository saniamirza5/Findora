import { Link } from "react-router-dom";
import "./Conversations.css";

const conversations = [
  {
    id: 1,
    name: "Aarav",
    item: "Blue Backpack",
    message: "Hey! I think this might be mine.",
    time: "2m ago",
    avatar: "A",
    color: "pink",
  },
  {
    id: 2,
    name: "Meera",
    item: "Black Wallet",
    message: "Where did you find it?",
    time: "1h ago",
    avatar: "M",
    color: "yellow",
  },
  {
    id: 3,
    name: "Rahul",
    item: "Silver Keys",
    message: "You can collect them at the main gate.",
    time: "Yesterday",
    avatar: "R",
    color: "green",
  },
];

function Conversations() {
  return (
    <main className="conversations-page">
      <section className="conversations-header">
        <div>
          <p className="conversations-kicker">
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

        <div className="conversation-list">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              to={`/chat/${conversation.id}`}
              className="conversation-card"
            >
              <div
                className={`conversation-avatar ${conversation.color}`}
              >
                {conversation.avatar}
              </div>

              <div className="conversation-main">
                <div className="conversation-name-row">
                  <h3>{conversation.name}</h3>

                  <span>
                    {conversation.time}
                  </span>
                </div>

                <p className="conversation-item">
                  ✦ {conversation.item}
                </p>

                <p className="conversation-message">
                  {conversation.message}
                </p>
              </div>

              <span className="conversation-arrow">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Conversations;