import "./admin_user-access-review-user.css";
import { useState } from "react";

const AdminUserAccountApproval = ({ user, onClose, onApprove, onReject }) => {
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [rejectComment, setRejectComment] = useState("");

  if (!user) return null;

  console.log("User object in approval modal:", user);

  const handleApproveClick = () => {
    setShowApproveConfirm(true);
  };

  const handleRejectClick = () => {
    setShowRejectConfirm(true);
  };

  // Helper to refresh token
  const refreshToken = async () => {
    const refresh = localStorage.getItem('adminRefreshToken');
    if (!refresh) return null;
    const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.access) {
      localStorage.setItem('adminAuthToken', data.access);
      return data.access;
    }
    return null;
  };

  const confirmApprove = async () => {
    try {
      let token = localStorage.getItem('adminAuthToken');
      let response = await fetch(`http://127.0.0.1:8000/api/employees/${user.id}/approve/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // If unauthorized, try refresh
      if (response.status === 401) {
        token = await refreshToken();
        if (!token) {
          alert('Session expired. Please log in again.');
          setShowApproveConfirm(false);
          onClose();
          return;
        }
        response = await fetch(`http://127.0.0.1:8000/api/employees/${user.id}/approve/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      if (response.ok) {
        alert('User approved and notified!');
      } else {
        const data = await response.json();
        alert(data.detail || 'Failed to approve user.');
      }
    } catch (err) {
      alert('Error approving user.');
    }

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
              src={
                user.image
                  ? user.image.startsWith('http')
                    ? user.image
                    : `http://127.0.0.1:8000/media/${user.image.replace(/^\/?employee_images\//, 'employee_images/')}`
                  : "/api/placeholder/80/80"
              }
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