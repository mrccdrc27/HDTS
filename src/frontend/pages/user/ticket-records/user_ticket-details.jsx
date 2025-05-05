import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../../styles/pages/user/user_ticket-details.css';

const TicketDetails = () => {
  const { ticketNumber } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [communicationPreference, setCommunicationPreference] = useState('in-app');
  const [internalNotes, setInternalNotes] = useState([]);
  const [newInternalNote, setNewInternalNote] = useState('');
  const [showInternalNotes, setShowInternalNotes] = useState(false);
  
  // For file uploading in messages
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // In a real app, fetch the ticket from an API
    // For demo purposes, we're creating mock data
    const mockTicket = {
      number: "TX0405",
      status: "Open",
      createdAt: "April 05, 2025 10:15 AM",
      assignedTo: "TiketDell",
      subject: "Request for personal app installation",
      category: "Software",
      subCategory: "Unauthorized Apps",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      fileName: "Attached File",
      address: "3517 W. Gray St. Utica, 57867",
      priority: "Medium",
      reportedBy: "John Smith",
      department: "Engineering",
      communicationPreference: "in-app", // Default communication preference
      notificationSettings: {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true
      },
      shipmentStatus: [
        { status: "Order Placed", date: "10 Jun 2024", time: "14:00 PM", details: "Shipment information received by seller", location: "Silicon Valley, CA" },
        { status: "Preparing to ship", date: "10 Jun 2024", time: "14:30 PM", details: "Seller is preparing to ship your order" },
        { status: "Confirm Shipment", date: "10 Jun 2024", time: "15:30 PM", details: "Shipment information received by carrier" },
        { status: "Picked up", date: "10 Jun 2024", time: "15:55 PM", details: "" }
      ]
    };

    // Mock messages
    const mockMessages = [
      { 
        id: 1, 
        sender: 'agent', 
        senderName: 'Support Agent',
        content: 'Hello! I see you need help with installing a personal app.', 
        timestamp: 'Apr 5, 10:30 AM',
        read: true,
        attachments: []
      },
      { 
        id: 2, 
        sender: 'user', 
        senderName: 'John Smith',
        content: 'Yes, I need approval to install Slack on my work computer.', 
        timestamp: 'Apr 5, 10:35 AM',
        read: true,
        attachments: []
      },
      { 
        id: 3, 
        sender: 'agent', 
        senderName: 'Support Agent',
        content: 'Can you provide more details about why you need this application?', 
        timestamp: 'Apr 5, 10:38 AM',
        read: false,
        attachments: []
      },
    ];

    // Mock internal notes (only visible to staff)
    const mockInternalNotes = [
      { 
        id: 1, 
        author: 'Team Lead', 
        content: 'This request needs manager approval before proceeding.', 
        timestamp: 'Apr 5, 10:40 AM' 
      },
      { 
        id: 2, 
        author: 'IT Security', 
        content: 'Please verify if this app meets our security requirements.', 
        timestamp: 'Apr 5, 11:05 AM' 
      }
    ];

    setTicket(mockTicket);
    setMessages(mockMessages);
    setCommunicationPreference(mockTicket.communicationPreference);
    setInternalNotes(mockInternalNotes);
  }, [ticketNumber]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' && !selectedFile) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      senderName: 'John Smith',
      content: newMessage,
      timestamp: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
      }),
      read: true,
      attachments: selectedFile ? [selectedFile.name] : []
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');
    setSelectedFile(null);

    // In a real app, you'd send this message to the server
    // and then possibly get an automated response or notify an agent
  };

  const handleInternalNoteSubmit = (e) => {
    e.preventDefault();
    if (newInternalNote.trim() === '') return;

    const newNote = {
      id: internalNotes.length + 1,
      author: 'Current User',
      content: newInternalNote,
      timestamp: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
      })
    };

    setInternalNotes([...internalNotes, newNote]);
    setNewInternalNote('');
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const markAsResolved = () => {
    // In a real app, this would update the ticket status via an API call
    setTicket({ ...ticket, status: 'Resolved' });
  };

  const handleCommunicationPrefChange = (e) => {
    setCommunicationPreference(e.target.value);
    // In a real app, you would update this preference in the backend
  };

  if (!ticket) {
    return <div className="p-6 text-red-600">Loading ticket information...</div>;
  }

  return (
    <div className="ticket-container">
      {/* Main content */}
      <main className="ticket-content">
        {/* Back button, title and resolve button */}
        <div className="ticket-nav">
          <button className="ticket-back" onClick={() => navigate(-1)}>←</button>
          <h1 className="ticket-title">Ticket Details</h1>
          <button className="resolve-button" onClick={markAsResolved}>
            Mark as Resolved
          </button>
        </div>

        {/* Two column layout */}
        <div className="ticket-columns">
          {/* Left column - Ticket details */}
          <div className="ticket-details">
            <div className="ticket-id-section">
              <div className="ticket-id">{ticket.number}</div>
              <div className={`ticket-status status-${ticket.status.toLowerCase()}`}>{ticket.status}</div>
              <div className="ticket-meta">
                <p>Created Time: {ticket.createdAt}</p>
                <p>Assigned to: {ticket.assignedTo}</p>
                <p>Priority: {ticket.priority}</p>
                <p>Reported by: {ticket.reportedBy}</p>
                <p>Department: {ticket.department}</p>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject:</label>
              <input
                type="text"
                className="form-input"
                value={ticket.subject}
                disabled
              />
            </div>

            <div className="form-row">
              <div className="form-col">
                <div className="form-group">
                  <label className="form-label">Category:</label>
                  <input
                    type="text"
                    className="form-input"
                    value={ticket.category}
                    disabled
                  />
                </div>
              </div>
              <div className="form-col">
                <div className="form-group">
                  <label className="form-label">Sub-Category:</label>
                  <input
                    type="text"
                    className="form-input"
                    value={ticket.subCategory}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description:</label>
              <textarea
                className="form-input"
                value={ticket.description}
                disabled
              />
            </div>

            <div className="form-group">
              <label className="form-label">File Upload:</label>
              <button className="file-attachment">
                <span className="file-icon">📎</span>
                {ticket.fileName}
              </button>
            </div>

            {/* Communication Preferences */}
            <div className="form-group">
              <label className="form-label">Communication Preference:</label>
              <select 
                className="form-input"
                value={communicationPreference}
                onChange={handleCommunicationPrefChange}
              >
                <option value="in-app">In-App Messages Only</option>
                <option value="email">Email + In-App</option>
                <option value="sms">SMS + In-App</option>
                <option value="all">All Channels</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Notification Settings:</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={ticket.notificationSettings.emailNotifications} 
                    onChange={() => {/* Would update in real app */}} 
                  />
                  Email Notifications
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={ticket.notificationSettings.smsNotifications} 
                    onChange={() => {/* Would update in real app */}} 
                  />
                  SMS Notifications
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={ticket.notificationSettings.pushNotifications} 
                    onChange={() => {/* Would update in real app */}} 
                  />
                  Push Notifications
                </label>
              </div>
            </div>

            {/* Internal Notes Toggle (for staff only) */}
            <div className="internal-notes-toggle">
              <button 
                className="toggle-button"
                onClick={() => setShowInternalNotes(!showInternalNotes)}
              >
                {showInternalNotes ? 'Hide Internal Notes' : 'Show Internal Notes'}
              </button>
            </div>

            {/* Internal Notes Section (for staff only) */}
            {showInternalNotes && (
              <div className="internal-notes">
                <h3 className="notes-title">Internal Notes</h3>
                <div className="notes-list">
                  {internalNotes.map((note) => (
                    <div key={note.id} className="note-item">
                      <div className="note-header">
                        <span className="note-author">{note.author}</span>
                        <span className="note-time">{note.timestamp}</span>
                      </div>
                      <div className="note-content">{note.content}</div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleInternalNoteSubmit} className="note-form">
                  <textarea
                    className="note-input"
                    placeholder="Add internal note (not visible to customer)..."
                    value={newInternalNote}
                    onChange={(e) => setNewInternalNote(e.target.value)}
                  />
                  <button type="submit" className="note-submit">Add Note</button>
                </form>
              </div>
            )}

            {/* Chat section */}
            <div className="ticket-chat">
              <h2 className="chat-title">Messages</h2>
              <div className="message-filters">
                <button className="filter-button active">All Messages</button>
                <button className="filter-button">Unread</button>
                <button className="filter-button">With Attachments</button>
              </div>
              <div className="chat-messages">
                {messages.map((message) => (
                  <div key={message.id} className={`message message-${message.sender} ${message.read ? 'read' : 'unread'}`}>
                    <div className="message-header">
                      <span className="message-sender">{message.senderName}</span>
                      <span className="message-time">{message.timestamp}</span>
                    </div>
                    <div className="message-content">
                      {message.content}
                    </div>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="message-attachments">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="message-attachment">
                            <span className="attachment-icon">📎</span>
                            <span className="attachment-name">{attachment}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {message.sender === 'agent' && !message.read && (
                      <div className="message-unread-indicator">New</div>
                    )}
                  </div>
                ))}
              </div>
              <form onSubmit={handleMessageSubmit}>
                <div className="chat-input-wrapper">
                  <div className="chat-input-container">
                    <input
                      type="text"
                      className="chat-input"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <div className="chat-actions">
                      <label className="file-upload-label">
                        <input
                          type="file"
                          className="file-upload-input"
                          onChange={handleFileChange}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"></path>
                        </svg>
                      </label>
                      <button type="submit" className="chat-submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      </button>
                    </div>
                  </div>
                  {selectedFile && (
                    <div className="selected-file">
                      <span className="file-icon">📎</span>
                      <span className="file-name">{selectedFile.name}</span>
                      <button 
                        type="button" 
                        className="remove-file"
                        onClick={() => setSelectedFile(null)}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right column - Tracking visualization */}
          <div className="ticket-tracking">
            <div className="tracking-address">
              {ticket.address}
            </div>

            {/* Tracking timeline visualization */}
            <div className="tracking-timeline">
              <div className="tracking-line"></div>
              <div className="tracking-step tracking-step-completed">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <div className="tracking-step tracking-step-completed">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="tracking-step tracking-step-pending">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <path d="M21 15l-5-5L5 21"></path>
                </svg>
              </div>
              <div className="tracking-step tracking-step-inactive">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </div>

            {/* Shipment status details */}
            <h3 className="tracking-status-title">Shipment Status</h3>
            <div className="status-list">
              {ticket.shipmentStatus.map((status, index) => (
                <div key={index} className="status-item">
                  <div className="status-dot"></div>
                  {index < ticket.shipmentStatus.length - 1 && (
                    <div className="status-line"></div>
                  )}
                  <div className="status-content">
                    <div className="status-title">{status.status}</div>
                    <div className="status-time">
                      {status.date} {status.time}
                    </div>
                    {status.details && (
                      <div className="status-details">{status.details}</div>
                    )}
                    {status.location && (
                      <div className="status-location">
                        <svg className="location-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {status.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TicketDetails;