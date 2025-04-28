import React from "react";

const SupportChatModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div className="chatbot-name">CHATBOT NAME</div>
          <button className="close-button" onClick={closeModal}>✖</button>
        </div>
        <div className="modal-body">
          <div className="bot-message time-stamp">9:59AM | APRIL 05, 2025</div>
          <div className="bot-message">
            👋 Hello there!
            <br />
            <br />
            I'm PAXI, your go-to support buddy! Need help with something?
            <br />
            Don’t worry—I've got you covered. Here's what I can do for you:
            <br />
            ✅ Troubleshoot common issues (slow computer, lost password, connection problems? No problem!)
            <br />
            ✅ Help you submit a support request if you need IT assistance
            <br />
            ✅ Provide updates on your ticket status so you always know what's happening
            <br />
            ✅ Share quick tech tips to make your work easier
            <br />
            📝 Let’s get started! How can I help today? 😊
          </div>
          <div className="user-message time-stamp">10:00AM | SUNDAY</div>
          <div className="user-message">
            What should I do if I encounter a technical issue with my computer, but I’m not sure whether it’s hardware or software-related?
          </div>
        </div>
        <div className="modal-footer">
          <input
            type="text"
            className="message-input"
            placeholder="What's your message?"
          />
          <button className="send-button">➤</button>
        </div>
      </div>
    </div>
  );
};

export default SupportChatModal;
