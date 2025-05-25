import { useState, useRef } from 'react';
import './user_navbar-notification.css';


export default function NotificationSystem() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1234,
      title: "Ticket Update",
      text: "Your ticket #1234 is currently being worked on. We'll update you with any progress.",
      time: "10 hrs. ago",
      link: "ticket-details.html?ticketId=1234",
      unread: true
    },
    {
      id: 5678,
      title: "New Message",
      text: "You received a message from John Doe.",
      time: "2 hrs. ago",
      link: "message-details.html?threadId=5678",
      unread: true
    },
    {
      id: 9988,
      title: "System Alert",
      text: "New system update is available.",
      time: "1 day ago",
      link: "system-alert.html?alertId=9988",
      unread: false
    }
  ]);
  
  // Set filter
  const handleFilterAll = () => {
    setActiveFilter('all');
  };
  
  const handleFilterUnread = () => {
    setActiveFilter('unread');
  };
  
  // Mark notification as read
  const markAsRead = (id, e) => {
    e.preventDefault();
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false } 
          : notification
      )
    );
  };
  
  return (
    <div className="notification-wrapper">
      <div 
        id="notificationModal" 
        className="notification-modal"
        style={{ display: 'block' }}
      >
        <h2 className="modal-title">Notification</h2>
        <hr />
        
        <div className="filter-container">
          <div className="filter-group">
            <button 
              id="filterAll"
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={handleFilterAll}
            >
              All
            </button>
            <button 
              id="filterUnread"
              className={`filter-btn ${activeFilter === 'unread' ? 'active' : ''}`}
              onClick={handleFilterUnread}
            >
              Unread
            </button>
          </div>
          <a href="#" className="see-all">See all</a>
        </div>
        
        <p className="earlier">Earlier</p>
        
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`notification-container ${notification.unread ? 'unread' : ''}`}
            style={{ display: activeFilter === 'all' || notification.unread ? 'flex' : 'none' }}
          >
            <a href={notification.link} className="notification-card">
              <div className="notification-dot"></div>
              <div className="notification-content">
                <strong className="notification-title">{notification.title}</strong>
                <p className="notification-text">{notification.text}</p>
                <span className="time">{notification.time}</span>
              </div>
              <button 
                className="mark-read" 
                onClick={(e) => markAsRead(notification.id, e)}
              >
                Mark as read
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}