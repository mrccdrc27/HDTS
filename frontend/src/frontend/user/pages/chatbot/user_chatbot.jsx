import React, { useState, useEffect, useRef } from "react";
import { Paperclip, Send } from "lucide-react"; // Lucide icons
import './user_chatbot.css';

const SupportChatModal = ({ closeModal }) => {
  const [messages, setMessages] = useState([
    {
      text: "👋 Hello there!\n\nI'm PAXI, your go-to support buddy! Need help with something?\nDon’t worry—I've got you covered. Here's what I can do for you:\n\n✅ Troubleshoot common issues (slow computer, lost password, connection problems? No problem!)\n✅ Help you submit a support request if you need IT assistance\n✅ Provide updates on your ticket status so you always know what's happening\n✅ Share quick tech tips to make your work easier\n\n📝 Let’s get started! How can I help today? 😊",
      sender: "bot",
      time: new Date(),
      isList: false,
    },
    {
      text: "What should I do if I encounter a technical issue with my computer, but I’m not sure whether it’s hardware or software-related?",
      sender: "user",
      time: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes}${ampm}`;
  };

  const formatDateDisplay = (date) => {
    const month = date.toLocaleString("default", { month: "long" }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    const weekday = date.toLocaleString("default", { weekday: "long" }).toUpperCase();
    return `${month} ${day}, ${year} | ${weekday}`;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      text: inputValue,
      sender: "user",
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages((prev) => [
        ...prev,
        {
          text: botResponse.text,
          sender: "bot",
          time: new Date(),
          isList: botResponse.isList,
          listItems: botResponse.listItems,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes("hardware") || msg.includes("software")) {
      return {
        text: "For hardware vs software issues, try the following steps:",
        isList: true,
        listItems: [
          "✅ Restart your device",
          "✅ Check if others have the same issue",
          "✅ Look for error messages",
          "✅ Contact IT support for diagnosis",
        ],
      };
    }
    return {
      text: "Thanks for your message! We'll get back to you shortly.",
      isList: false,
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const renderMessage = (msg, index) => {
    const time = msg.time ? new Date(msg.time) : new Date();
    return (
      <div
        key={index}
        className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
      >
        <div className="timestamp-display">
          {formatTime(time)} | {formatDateDisplay(time)}
        </div>
        {msg.isList && msg.listItems ? (
          <>
            <p>{msg.text}</p>
            <ul className="bot-features-list">
              {msg.listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        ) : (
          msg.text.split("\n").map((line, i) => <p key={i}>{line}</p>)
        )}
      </div>
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const userMessage = {
        text: `📎 You uploaded: ${file.name}`,
        sender: "user",
        time: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
    }
  };

  return (
    <div className="chat-modal showing">
      <div className="chat-modal-content">
        <div className="chat-header">
          <div className="chatbot-info">
            <div className="bot-avatar" />
            <h3>PAXI</h3>
          </div>
          <button className="close-btn" onClick={closeModal}>✖</button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => renderMessage(msg, index))}
          {isTyping && (
            <div className="message bot-message typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <div className="chat-input-area">
            <input
              id="chatInput"
              type="text"
              placeholder="What's your message?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />

            {/* Upload Icon */}
            <label className="upload-btn">
              <input type="file" onChange={handleFileUpload} style={{ display: "none" }} />
              <Paperclip className="upload-icon" />
            </label>

            {/* Send Button */}
            <button className="send-btn" onClick={handleSend}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChatModal;
