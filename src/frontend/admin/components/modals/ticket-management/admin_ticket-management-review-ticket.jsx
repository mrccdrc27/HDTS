import { useEffect, useState } from 'react';
import './admin_ticket-management-review-ticket.css';
import AdminTicketManagementRejectTicket from './admin_ticket-management-reject-ticket';

const AdminTicketManagementReviewNewTicket = ({ onClose }) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [priority, setPriority] = useState('Low');
  const [department, setDepartment] = useState('IT Support');
  const [approvalNotes, setApprovalNotes] = useState('');

  const handleOpenTicket = () => {
    setShowApprovalModal(true);
  };

  const handleRejectTicket = () => {
    setShowRejectionModal(true);
  };

  const handleCloseModal = () => {
    setShowRejectionModal(false);
    setShowApprovalModal(false);
    setRejectionReason('');
    setApprovalNotes('');
  };

  const handleCloseAll = () => {
    handleCloseModal();
    onClose();
  };

  const submitRejection = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }
    alert('Rejection Submitted:\n' + rejectionReason);
    handleCloseAll();
  };

  const submitApproval = () => {
    alert(
      `Approval Submitted:\nPriority: ${priority}\nDepartment: ${department}\nNotes: ${
        approvalNotes || 'None'
      }`
    );
    handleCloseAll();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showRejectionModal || showApprovalModal) {
          handleCloseModal();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showRejectionModal, showApprovalModal]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('admin-ticket-modal-overlay')) {
      if (showRejectionModal || showApprovalModal) {
        handleCloseModal();
      } else {
        onClose();
      }
    }
  };

  return (
    <div
      className={`admin-ticket-modal-overlay active`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-ticket-title"
    >
      {!showRejectionModal && (
        <div className="admin-ticket-modal-content">
          <button
            className="admin-ticket-modal-close-btn"
            onClick={onClose}
            aria-label="Close review ticket modal"
          >
            &times;
          </button>
          <h2 id="review-ticket-title" className="admin-ticket-modal-title">
            Review New Ticket
          </h2>
          <p>This is where the ticket details will go!</p>

          <div className="admin-ticket-modal-actions">
            <button className="open-ticket-btn" onClick={handleOpenTicket}>
              Open Ticket
            </button>
            <button className="reject-ticket-btn" onClick={handleRejectTicket}>
              Reject Ticket
            </button>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <AdminTicketManagementRejectTicket
          rejectionReason={rejectionReason}
          setRejectionReason={setRejectionReason}
          onCancel={handleCloseAll} // Updated here
          onSubmit={submitRejection}
        />
      )}

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="modal approval-modal">
          <div className="modal-content">
            <h3>Approve Ticket</h3>
            <p>
              <strong>Are you sure you want to approve this ticket?</strong>
            </p>

            <div className="form-group">
              <label htmlFor="priority">Priority Level</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="department">Assign to Department</label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option>IT Support</option>
                <option>Network</option>
                <option>Security</option>
                <option>Development</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="approvalNotes">Additional Notes (Optional)</label>
              <textarea
                id="approvalNotes"
                placeholder="Enter any notes..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
              ></textarea>
            </div>

            <div className="modal-actions">
              <button className="btn secondary-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="btn approve-btn" onClick={submitApproval}>
                Submit Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTicketManagementReviewNewTicket;
