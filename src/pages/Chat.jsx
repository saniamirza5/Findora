import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Chat.css";

const mockConversation = {
  name: "Aarav",
  item: "Blue Backpack",
  status: "LOST",
  avatar: "A",
};

const initialMessages = [
  {
    id: 1,
    sender: "other",
    text: "Hey! I think this might be my backpack.",
    time: "5:32 PM",
  },
  {
    id: 2,
    sender: "me",
    text: "Hi! Can you describe what was inside?",
    time: "5:34 PM",
  },
  {
    id: 3,
    sender: "other",
    text: "There was a blue notebook and a small keychain on the front.",
    time: "5:35 PM",
  },
  {
    id: 4,
    sender: "me",
    text: "Yes! That sounds like the one I found.",
    time: "5:36 PM",
  },
];

function Chat() {
  const { conversationId } = useParams();

  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: message.trim(),
      time: "Now",
    };

    setMessages((previous) => [
      ...previous,
      newMessage,
    ]);

    setMessage("");
  };

  return (
    <main className="chat-page">
      <section className="chat-container">

        {/* CHAT HEADER */}

        <header className="chat-header">
          <Link
            to="/conversations"
            className="chat-back"
          >
            ←
          </Link>

          <div className="chat-user-avatar">
            {mockConversation.avatar}
          </div>

          <div className="chat-user-info">
            <h1>{mockConversation.name}</h1>

            <p>
              ✦ {mockConversation.item}
            </p>
          </div>

          <span
            className={`chat-status ${mockConversation.status.toLowerCase()}`}
          >
            {mockConversation.status}
          </span>
        </header>

        {/* ITEM CONTEXT */}

        <div className="chat-item-context">
          <span className="chat-item-icon">
            🎒
          </span>

          <div>
            <small>ABOUT THIS ITEM</small>

            <strong>
              {mockConversation.item}
            </strong>
          </div>

          <Link to="/items/1">
            View →
          </Link>
        </div>

        {/* MESSAGES */}

        <div className="messages-area">
          <div className="message-date">
            TODAY
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-row ${msg.sender}`}
            >
              <div className="message-bubble">
                <p>{msg.text}</p>

                <span>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* MESSAGE INPUT */}

        <form
          className="message-form"
          onSubmit={handleSend}
        >
          <input
            type="text"
            placeholder="Write a message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
          />

          <button type="submit">
            Send ✦
          </button>
        </form>

      </section>
    </main>
  );
}

export default Chat;