import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Chat.css";

function Chat() {
  const { conversationId } = useParams();
  const { user, token } = useAuth();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const stompClient = useRef(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const conversationResponse = await api.get(
          `/api/conversations/${conversationId}`
        );

        const messagesResponse = await api.get(
          `/api/messages/${conversationId}`
        );

        setConversation(conversationResponse.data);
        setMessages(messagesResponse.data);

      } catch (err) {
        console.error("Error loading chat:", err);
        setError("Unable to load this conversation.");
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [conversationId]);

  useEffect(() => {
    if (!user?.userId || !conversationId) {
      return;
    }

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      reconnectDelay: 5000,

      onConnect: () => {
        console.log("WebSocket connected");

        client.subscribe(
          `/topic/conversation/${conversationId}`,
          (message) => {
            try {
              const receivedMessage = JSON.parse(
                message.body
              );

              setMessages((previousMessages) => {

                // Prevent duplicate messages
                if (
                  previousMessages.some(
                    (msg) =>
                      msg.id &&
                      msg.id === receivedMessage.id
                  )
                ) {
                  return previousMessages;
                }

                return [
                  ...previousMessages,
                  receivedMessage,
                ];
              });

            } catch (err) {
              console.error(
                "Error processing WebSocket message:",
                err
              );
            }
          }
        );
      },

      onStompError: (frame) => {
        console.error(
          "WebSocket STOMP error:",
          frame
        );
      },

      onWebSocketError: (error) => {
        console.error(
          "WebSocket error:",
          error
        );
      },

      onDisconnect: () => {
        console.log("WebSocket disconnected");
      },
    });

    stompClient.current = client;

    client.activate();

    return () => {
      client.deactivate();
      stompClient.current = null;
    };

  }, [conversationId, user?.userId, token]);

  const getOtherUser = () => {
    if (!conversation || !user) {
      return null;
    }

    if (conversation.user1.id === user.userId) {
      return conversation.user2;
    }

    return conversation.user1;
  };

  const handleSend = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    if (
      !stompClient.current ||
      !stompClient.current.connected
    ) {
      alert(
        "Chat connection is not ready. Please try again."
      );
      return;
    }

    const chatMessage = {
      conversationId: Number(conversationId),
      senderId: user.userId,
      content: trimmedMessage,
    };

    stompClient.current.publish({
      destination: "/app/chat",
      body: JSON.stringify(chatMessage),
    });

    setMessage("");
  };

  if (loading) {
    return (
      <main className="chat-page">
        <p>Loading conversation...</p>
      </main>
    );
  }

  if (error || !conversation) {
    return (
      <main className="chat-page">
        <p>
          {error || "Conversation not found."}
        </p>

        <Link to="/conversations">
          ← Back to conversations
        </Link>
      </main>
    );
  }

  const otherUser = getOtherUser();

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
            {otherUser?.name
              ?.charAt(0)
              .toUpperCase() || "U"}
          </div>

          <div className="chat-user-info">

            <h1>
              {otherUser?.name || "User"}
            </h1>

            <p>
              ✦ {conversation.item.itemName}
            </p>

          </div>

          <span
            className={`chat-status ${conversation.item.status.toLowerCase()}`}
          >
            {conversation.item.status}
          </span>

        </header>

        {/* ITEM CONTEXT */}

        <div className="chat-item-context">

          <span className="chat-item-icon">
            📦
          </span>

          <div>
            <small>ABOUT THIS ITEM</small>

            <strong>
              {conversation.item.itemName}
            </strong>
          </div>

          <Link
            to={`/items/${conversation.item.id}`}
          >
            View →
          </Link>

        </div>

        {/* MESSAGES */}

        <div className="messages-area">

          <div className="message-date">
            MESSAGES
          </div>

          {messages.length === 0 && (
            <p>
              No messages yet. Start the conversation!
            </p>
          )}

          {messages.map((msg) => {

            const isMine =
              msg.sender?.id === user?.userId ||
              msg.senderId === user?.userId;

            return (
              <div
                key={msg.id}
                className={`message-row ${
                  isMine ? "me" : "other"
                }`}
              >

                <div className="message-bubble">

                  <p>
                    {msg.content}
                  </p>

                  <span>
                    {msg.createdAt
                      ? new Date(
                          msg.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>

                </div>

              </div>
            );
          })}

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