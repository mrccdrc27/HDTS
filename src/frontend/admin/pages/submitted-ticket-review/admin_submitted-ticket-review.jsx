import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, CheckCircle } from 'lucide-react';
import './admin_submitted-ticket-review.css';

const SubmittedTicketReviewPage = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'opened' or 'closed'

  // Sample ticket data - static
  const ticketData = {
    number: 'TX0405',
    subject: 'Request for personal app installation',
    requester: {
      name: 'Bogart Batumbakal',
      avatar: '/api/placeholder/40/40',
      role: 'Software Developer • IT Consultant • IT Department'
    },
    category: 'Software',
    subCategory: 'Unauthorized Apps',
    hasAttachment: true,
    attachmentName: 'Attached file',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tellus nisl, tempor lobortum ut sodales mauris blandit id. Ut consectetur tellus, commodo consequat, quis ante nulla datur ut dignissim ut volutatis velit. Eros edan sodales ut fugiat rutro porttitor. Suspendut ant molestiae volutpat magna. Pellentesque pellentum consectetur nibh at mattis praesent quis massa."
  };

  const handleOpenTicket = () => {
    setModalType('opened');
    setShowModal(true);
  };

  const handleCloseTicket = () => {
    setModalType('closed');
    setShowFinalModal(true);
  };

  const handleModalApprove = () => {
    setShowModal(false);
    setShowFinalModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const closeFinalModal = () => {
    setShowFinalModal(false);
    navigate(`/admin/ticket-review/${ticketData.number}`);
  };

  return (
    <>
      <style jsx>{`
        .submitted-ticket-review-container {
          padding: 24px;
          max-width: 800px;
          margin: 0 auto;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .page-title {
          font-size: 28px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #1f2937;
        }

        .divider {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 0 0 32px 0;
        }

        .section {
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #1f2937;
        }

        .info-card {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #f3f4f6;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-name {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #1f2937;
        }

        .user-role {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .ticket-number {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #1f2937;
        }

        .ticket-subject {
          margin-bottom: 12px;
        }

        .subject-label {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
        }

        .subject-text {
          font-size: 14px;
          color: #1f2937;
        }

        .categories-row {
          display: flex;
          gap: 24px;
          margin-bottom: 16px;
        }

        .category-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-label {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
        }

        .category-badge {
          background-color: #dbeafe;
          color: #1e40af;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
        }

        .subcategory-badge {
          background-color: #fef3c7;
          color: #92400e;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
        }

        .attachment-section {
          margin-bottom: 16px;
        }

        .attachment-label {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          margin-right: 8px;
        }

        .attachment-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background-color: #e5e7eb;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
        }

        .description-section {
          margin-bottom: 16px;
        }

        .description-label {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          display: block;
          margin-bottom: 8px;
        }

        .description-text {
          font-size: 14px;
          color: #374151;
          line-height: 1.5;
          background-color: #f9fafb;
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        }

        .action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .open-ticket-btn {
          padding: 10px 20px;
          background-color: #10b981;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .close-ticket-btn {
          padding: 10px 20px;
          background-color: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          border-radius: 12px;
          padding: 32px;
          max-width: 560px;
          width: 90%;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 32px 0;
          color: #1f2937;
        }

        .form-row {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }

        .form-group {
          flex: 1;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          display: block;
          margin-bottom: 8px;
        }

        .form-select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          background-color: white;
          appearance: none;
          cursor: pointer;
          position: relative;
        }

        .form-select.placeholder {
          color: #6b7280;
        }

        .form-select.filled {
          color: #374151;
        }

        .select-wrapper {
          position: relative;
        }

        .select-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #6b7280;
          font-size: 12px;
        }

        .textarea-group {
          margin-bottom: 32px;
        }

        .form-textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          color: #374151;
          background-color: white;
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
        }

        .modal-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .cancel-btn {
          padding: 12px 32px;
          background-color: #e5e7eb;
          color: #6b7280;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .approve-btn {
          padding: 12px 32px;
          background-color: #22c55e;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .final-modal-content {
          background-color: white;
          border-radius: 12px;
          padding: 32px;
          max-width: 400px;
          width: 90%;
          text-align: center;
        }

        .success-icon {
          color: #10b981;
          margin: 0 auto 16px auto;
        }

        .final-modal-title {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 12px 0;
          color: #1f2937;
        }

        .final-modal-message {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 24px 0;
          line-height: 1.5;
        }

        .ok-btn {
          padding: 10px 24px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }
      `}</style>

      <div className="submitted-ticket-review-container">
        <h1 className="page-title">Submitted Ticket Review</h1>
        <hr className="divider" />
        
        <div className="section">
          <p className="section-title">User Information</p>
          <div className="info-card">
            <div className="user-info">
              <div className="user-avatar">
                <img 
                  src={ticketData.requester.avatar} 
                  alt={ticketData.requester.name}
                />
              </div>
              <div>
                <h3 className="user-name">{ticketData.requester.name}</h3>
                <p className="user-role">{ticketData.requester.role}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="section">
          <p className="section-title">Ticket Information</p>
          <div className="info-card">
            <div>
              <h2 className="ticket-number">{ticketData.number}</h2>
              <div className="ticket-subject">
                <span className="subject-label">Subject: </span>
                <span className="subject-text">{ticketData.subject}</span>
              </div>
            </div>

            <div className="categories-row">
              <div className="category-item">
                <span className="category-label">Category:</span>
                <div className="category-badge">{ticketData.category}</div>
              </div>
              <div className="category-item">
                <span className="category-label">Sub-Category:</span>
                <div className="subcategory-badge">{ticketData.subCategory}</div>
              </div>
            </div>

            {ticketData.hasAttachment && (
              <div className="attachment-section">
                <span className="attachment-label">File Upload:</span>
                <button className="attachment-btn">
                  <Download size={16} />
                  {ticketData.attachmentName}
                </button>
              </div>
            )}

            <div className="description-section">
              <label className="description-label">Description:</label>
              <div className="description-text">
                {ticketData.description}
              </div>
            </div>
          </div>
        </div>
        
        <div className="section">
          <div className="action-buttons">
            <button className="open-ticket-btn" onClick={handleOpenTicket}>
              Open Ticket
            </button>
            <button className="close-ticket-btn" onClick={handleCloseTicket}>
              Close Ticket
            </button>
          </div>
        </div>

        {/* Admin Review Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-title">Admin Review</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Priority Level *</label>
                  <div className="select-wrapper">
                    <select className="form-select placeholder">
                      <option>Set Priority Level</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                    <div className="select-arrow">▼</div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Department: *</label>
                  <div className="select-wrapper">
                    <select className="form-select filled">
                      <option>Operations</option>
                      <option>IT Department</option>
                      <option>HR</option>
                      <option>Finance</option>
                      <option>Marketing</option>
                    </select>
                    <div className="select-arrow">▼</div>
                  </div>
                </div>
              </div>
              
              <div className="textarea-group">
                <label className="form-label">note:</label>
                <textarea className="form-textarea" rows={5} />
              </div>
              
              <div className="modal-buttons">
                <button className="cancel-btn" onClick={handleModalCancel}>
                  CANCEL
                </button>
                <button className="approve-btn" onClick={handleModalApprove}>
                  APPROVE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Final Success Modal */}
        {showFinalModal && (
          <div className="modal-overlay">
            <div className="final-modal-content">
              <div>
                <CheckCircle size={48} className="success-icon" />
              </div>
              <h3 className="final-modal-title">
                {modalType === 'opened' ? 'Ticket Opened!' : 'Ticket Closed!'}
              </h3>
              <p className="final-modal-message">
                {modalType === 'opened' 
                  ? 'The ticket has been opened and is now available for processing.'
                  : 'The ticket has been closed and the requester will be notified.'
                }
              </p>
              <button className="ok-btn" onClick={closeFinalModal}>
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubmittedTicketReviewPage;