import React, { useState, useEffect, useRef } from "react";
import { Paperclip, Send } from "lucide-react";
import { marked } from "marked";
import './user_chatbot.css';

const FAQ_SYSTEM_PROMPT = `
You are a support assistant for SmartSupport. Only answer questions based on the following FAQs:
1. What types of issues can I report?
2. How do I submit a ticket?
3. How can I track the status of my ticket?
4. Can I update or add more information to an existing ticket?
5. How long does it take to resolve a ticket?
6. I submitted a request, but I haven’t heard back. What should I do?
7. What if I need urgent support?
If you don't know the answer, say 'Please refer to our support team.'
`;

const defaultMessages = [
  {
    text: "👋 Hello there!\n\nI'm PAXI, your go-to support buddy! Need help with something?\nDon’t worry—I've got you covered. Here's what I can do for you:\n\n✅ Troubleshoot common issues (slow computer, lost password, connection problems? No problem!)\n✅ Help you submit a support request if you need IT assistance\n✅ Provide updates on your ticket status so you always know what's happening\n✅ Share quick tech tips to make your work easier\n\n📝 Let’s get started! How can I help today? 😊",
    sender: "bot",
    time: new Date(),
    isList: false,
  }
];

const SupportChatModal = ({ closeModal }) => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatbotMessages");
    if (saved) {
      // Parse and convert time strings back to Date objects
      return JSON.parse(saved).map(msg => ({
        ...msg,
        time: msg.time ? new Date(msg.time) : new Date()
      }));
    }
    return defaultMessages;
  });
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

  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
  }, [messages]);

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

  // Restrict AI to FAQ knowledge by prepending a system prompt
  const fetchOpenRouterResponse = async (userMessage) => {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json",
          // "HTTP-Referer": "http://localhost:3000", // Optional
          // "X-Title": "SmartSupport", // Optional
        },
        body: JSON.stringify({
          model: "mistralai/devstral-small:free",
          messages: [
            {
              role: "system",
              content: FAQ_SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
      });

      const data = await response.json();
      console.log(data); // Debug: see the full response

      if (data.error) {
        return `Error: ${data.error.message || "Unknown error from API."}`;
      }
      return data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
    } catch (error) {
      return "Sorry, there was an error connecting to the support service.";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      text: inputValue,
      sender: "user",
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Fetch response from OpenRouter with system prompt
    const botText = await fetchOpenRouterResponse(userMessage.text);

    setMessages((prev) => [
      ...prev,
      {
        text: botText,
        sender: "bot",
        time: new Date(),
        isList: false,
      },
    ]);
    setIsTyping(false);
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
        <div
          className="message-content"
          dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
        />
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
      // To send the image to OpenRouter, you would need to upload it somewhere and get a public URL,
      // then call fetchOpenRouterResponse(inputValue, imageUrl)
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
              autoComplete="off"
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
