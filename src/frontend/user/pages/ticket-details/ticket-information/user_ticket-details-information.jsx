// UserTicketDetailsInformation.jsx
import './user_ticket-details-information.css';

const UserTicketDetailsInformation = () => {
  return (
    <div className="ticket-container">
      {/* Header Section */}
      <div className="ticket-header"> 
        <h1 className="ticket-id">TX0405</h1>
        <span className="status-button">Open</span>
      </div>
      
      {/* Created Time and Assignment */}
      <div className="ticket-metadata">
        <span>Created Time: April 05, 2025 10:15 AM</span>
        <span>Assigned to: Tinkerbell</span>
      </div>
      
      {/* Subject Field */}
      <div className="field-group">
        <label className="field-label">Subject:</label>
        <textarea
          className="field-input"
          value="Request for personal app installation"
          readOnly
        />
      </div>

      {/* Category and Sub-Category */}
      <div className="form-row">
        <div className="form-column">
          <label className="form-label">Category:</label>
          <input 
            type="text" 
            value="Software" 
            className="form-input"
            readOnly
          />
        </div>
        <div className="form-column">
          <label className="form-label">Sub-Category:</label>
          <input 
            type="text" 
            value="Unauthorized Apps" 
            className="form-input"
            readOnly
          />
        </div>
      </div>

      {/* Description */}
      <div className="field-group ">
        <label className="field-label">Description:</label>
        <textarea 
          className="description-textarea"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          readOnly
        />
      </div>

      {/* File Upload */}
      <div className="file-upload-section">
        <label className="form-label">File Upload:</label>
        <button className="file-button">
          <svg className="file-icon" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" 
              clipRule="evenodd" 
            />
          </svg>
          Attached File
        </button>
      </div>
    </div>
  );
};

export default UserTicketDetailsInformation;