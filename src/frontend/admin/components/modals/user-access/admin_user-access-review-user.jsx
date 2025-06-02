import "./admin_user-access-review-user.css";
import { useState } from "react";

const AdminUserAccountApproval = ({ user, onClose, onApprove, onReject }) => {
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [rejectComment, setRejectComment] = useState("");

  if (!user) return null;

  const handleApproveClick = () => {
    setShowApproveConfirm(true);
  };

  const handleRejectClick = () => {
    setShowRejectConfirm(true);
  };

  const confirmApprove = () => {
    if (onApprove) onApprove(user);
    setShowApproveConfirm(false);
    onClose();
  };

  const confirmReject = () => {
    if (rejectComment.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }
    if (onReject) onReject(user, rejectComment);
    setShowRejectConfirm(false);
    setRejectComment("");
    onClose();
  };

  const cancelApprove = () => {
    setShowApproveConfirm(false);
  };

  const cancelReject = () => {
    setShowRejectConfirm(false);
    setRejectComment("");
  };

  return (
    <div className="modal-reviewoverlay" onClick={onClose}>
      <div className="modal-contentdisplay approval-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        <div className="approval-header">
          <h1>New Created Account Approval</h1>
        </div>

        <div className="approval-content">
          <div className="user-avatar">
            <img 
              src={user.avatar || "/api/placeholder/80/80"} 
              alt="User Avatar" 
              className="avatar-image"
            />
          </div>

          <div className="user-details">
            <div className="name-row">
              <div className="field-group">
                <label>Last Name:</label>
                <input type="text" value={user.lastName || ''} readOnly className="readonly-input" />
              </div>
              <div className="field-group">
                <label>First Name:</label>
                <input type="text" value={user.firstName || ''} readOnly className="readonly-input" />
              </div>
              <div className="field-group">
                <label>Middle Name:</label>
                <input type="text" value={user.middleName || ''} readOnly className="readonly-input" />
              </div>
              <div className="field-group">
                <label>Suffix:</label>
                <input type="text" value={user.suffix || ''} readOnly className="readonly-input" />
              </div>
            </div>

            <div className="details-row">
              <div className="field-group">
                <label>Company ID:</label>
                <input type="text" value={user.companyId || ''} readOnly className="readonly-input" />
              </div>
              <div className="field-group">
                <label>Department:</label>
                <input type="text" value={user.department || ''} readOnly className="readonly-input" />
              </div>
            </div>

            <div className="email-row">
              <div className="field-group full-width">
                <label>Email address:</label>
                <input type="email" value={user.email || ''} readOnly className="readonly-input" />
              </div>
            </div>
          </div>
        </div>

        <div className="approval-actions">
          <button className="reject-btn" onClick={handleRejectClick}>Reject</button>
          <button className="approve-btn" onClick={handleApproveClick}>Approve</button>
        </div>

        {/* Approve Confirmation Modal */}
        {showApproveConfirm && (
          <div className="confirmation-overlay">
            <div className="confirmation-modal">
              <h3>Confirm Approval</h3>
              <p>Are you sure you want to approve this user account for <strong>{user.firstName} {user.lastName}</strong>?</p>
              <div className="confirmation-actions">
                <button className="cancel-buttn" onClick={cancelApprove}>Cancel</button>
                <button className="confirm-buttn approve" onClick={confirmApprove}>Yes, Approve</button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Confirmation Modal */}
        {showRejectConfirm && (
          <div className="confirmation-overlay">
            <div className="confirmation-modal reject-modal">
              <h3>Confirm Rejection</h3>
              <p>Please provide a reason for rejecting <strong>{user.firstName} {user.lastName}</strong>'s account:</p>
              <textarea
                value={rejectComment}
                onChange={(e) => setRejectComment(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="reject-comment"
                rows="4"
              />
              <div className="confirmation-actions">
                <button className="cancel-buttn" onClick={cancelReject}>Cancel</button>
                <button className="confirm-buttn reject" onClick={confirmReject}>Reject Account</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserAccountApproval;