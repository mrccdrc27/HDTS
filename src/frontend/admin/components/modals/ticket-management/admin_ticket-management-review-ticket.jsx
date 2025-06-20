import { useEffect, useState } from 'react';
import './admin_ticket-management-review-ticket.css';

const AdminTicketManagementReviewNewTicket = ({ ticketId, onClose, onTicketUpdated }) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [priority, setPriority] = useState('Low');
  const [department, setDepartment] = useState('IT Department');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  console.log("API_BASE_URL:", API_BASE_URL);

  // Fetch ticket details
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('adminAuthToken');
        console.log("Auth token:", token);
        
        const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch ticket data');
        }

        const data = await response.json();
        console.log("Ticket detail raw data:", data);
        
        // Transform the data to match the expected structure
        const transformedData = {
          ticketNumber: data.ticket_number,
          employeeName: data.employee ? `${data.employee.first_name} ${data.employee.last_name}` : 'Unknown',
          companyId: data.employee?.company_id || 'N/A',
          employeeDepartment: data.employee?.department || 'N/A',
          subject: data.subject,
          category: data.category,
          subCategory: data.sub_category,
          description: data.description,
          attachments: data.attachments || [],
          submitDate: new Date(data.submit_date).toLocaleDateString(),
          status: data.status,
        };

        setTicketData(transformedData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching ticket:', err);
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      fetchTicketData();
    }
  }, [ticketId, API_BASE_URL]);

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

  const submitRejection = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection.');
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem('adminAuthToken');
      
      const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}/reject/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rejection_reason: rejectionReason,
          status: 'Rejected'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject ticket');
      }

      alert('Ticket rejected successfully!');
      onTicketUpdated && onTicketUpdated(ticketId, 'Rejected');
      handleCloseAll();
    } catch (err) {
      alert('Error rejecting ticket: ' + err.message);
      console.error('Error rejecting ticket:', err);
    } finally {
      setSubmitting(false);
    }
  };

  console.log("Approving ticket ID:", ticketId);

  const submitApproval = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem('adminAuthToken');

      if (!token) {
        alert('No authentication token found. Please log in again.');
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}/approve/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priority: priority,
          department: department,
          approval_notes: approvalNotes,
          status: 'Open'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to approve ticket');
      }

      alert('Ticket approved successfully!');
      onTicketUpdated && onTicketUpdated(ticketId, 'Open');
      handleCloseAll();
      
    } catch (err) {
      alert('Error approving ticket: ' + err.message);
      console.error('Error approving ticket:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const viewAttachmentInNewTab = (fileUrl) => {
    if (fileUrl) {
      // If fileUrl is already absolute, use as is; otherwise, prepend API base URL
      const url = fileUrl.startsWith('http') ? fileUrl : `${API_BASE_URL}${fileUrl}`;
      window.open(url, '_blank');
    } else {
      alert('Attachment file URL not available.');
    }
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
    if (e.target.classList.contains('admin-ticket-modal-overlay') || 
        e.target.classList.contains('secondary-modal-overlay')) {
      if (showRejectionModal || showApprovalModal) {
        handleCloseModal();
      } else {
        onClose();
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-ticket-modal-overlay active">
        <div className="admin-ticket-modal-content">
          <div className="loading-spinner">Loading ticket details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-ticket-modal-overlay active">
        <div className="admin-ticket-modal-content">
          <div className="error-message">
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={onClose} className="btn secondary-btn">Close</button>
          </div>
        </div>
      </div>
    );
  }

  if (!ticketData) {
    return null;
  }

  return (
    <div>
      <div
        className={`admin-ticket-modal-overlay active`}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-ticket-title"
      >
        {!showRejectionModal && !showApprovalModal && (
          <div className="admin-ticket-modal-content">
            <div className="admin-ticket-modal-header">
              <h2 id="review-ticket-title" className="admin-ticket-modal-title">
                Review Ticket #{ticketData.ticketNumber}
              </h2>
              <button
                className="admin-ticket-modal-close-btn"
                onClick={onClose}
                aria-label="Close review ticket modal"
              >
                &times;
              </button>
            </div>

            <div className="admin-ticket-modal-body">
              <div className="ticket-meta-info">
                <div className="form-row">
                  <div className="form-group half-width">
                    <label className="form-label">Ticket Number:</label>
                    <input
                      type="text"
                      value={ticketData.ticketNumber}
                      readOnly
                      className="form-input readonly"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label className="form-label">Submit Date:</label>
                    <input
                      type="text"
                      value={ticketData.submitDate}
                      readOnly
                      className="form-input readonly"
                    />
                  </div>
                </div>
              </div>

              <h3 className="employee-request-title">Employee Information & Request</h3>

              <div className="employee-info-section">
                <div className="form-row">
                  <div className="form-group half-width">
                    <label className="form-label">Employee Name:</label>
                    <input
                      type="text"
                      value={ticketData.employeeName}
                      readOnly
                      className="form-input readonly"
                    />
                  </div>
                  <div className="form-group half-width">
                    <label className="form-label">Company ID:</label>
                    <input
                      type="text"
                      value={ticketData.companyId}
                      readOnly
                      className="form-input readonly"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Department:</label>
                  <input
                    type="text"
                    value={ticketData.employeeDepartment}
                    readOnly
                    className="form-input readonly"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject:</label>
                <input
                  type="text"
                  value={ticketData.subject}
                  readOnly
                  className="form-input readonly"
                />
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <label className="form-label">Category:</label>
                  <select value={ticketData.category} disabled className="form-select readonly">
                    <option>{ticketData.category}</option>
                  </select>
                </div>
                <div className="form-group half-width">
                  <label className="form-label">Sub-Category:</label>
                  <select value={ticketData.subCategory} disabled className="form-select readonly">
                    <option>{ticketData.subCategory}</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description:</label>
                <textarea
                  value={ticketData.description}
                  readOnly
                  rows={6}
                  className="form-textarea readonly"
                />
              </div>

              {ticketData.attachments && ticketData.attachments.length > 0 && (
                <div className="form-group">
                  <label className="form-label">File Attachments</label>
                  <ul className="attachment-list">
                    {ticketData.attachments.map((attachment, index) => (
                      <li key={index} style={{ marginBottom: '6px' }}>
                        <span 
                          className="file-attachment" 
                          style={{ 
                            cursor: 'pointer', 
                            color: '#007bff', 
                            textDecoration: 'underline' 
                          }}
                          onClick={() => viewAttachmentInNewTab(attachment.file)}
                        >
                          📎 {attachment.file_name || `Attachment ${index + 1}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="admin-ticket-modal-actions">
                <button 
                  className="reject-ticket-btn" 
                  onClick={handleRejectTicket}
                  disabled={submitting}
                >
                  Reject
                </button>
                <button 
                  className="approve-ticket-btn" 
                  onClick={handleOpenTicket}
                  disabled={submitting}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rejection Modal */}
        {showRejectionModal && (
          <div className="secondary-modal-overlay" onClick={handleOverlayClick}>
            <div className="secondary-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="secondary-modal-header">
                <h3 className="secondary-modal-title">Reject Ticket #{ticketData.ticketNumber}</h3>
                <button
                  className="admin-ticket-modal-close-btn"
                  onClick={handleCloseModal}
                  aria-label="Close rejection modal"
                >
                  &times;
                </button>
              </div>
              
              <div className="secondary-modal-body">
                <p>
                  <strong>Are you sure you want to reject this ticket?</strong>
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="rejectionReason">
                    Reason for Rejection <span style={{color: '#dc3545'}}>*</span>
                  </label>
                  <textarea
                    id="rejectionReason"
                    className="form-textarea"
                    placeholder="Please provide a detailed reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="secondary-modal-actions">
                  <button 
                    className="btn secondary-btn" 
                    onClick={handleCloseModal}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn reject-btn" 
                    onClick={submitRejection}
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Rejection'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Approval Modal */}
        {showApprovalModal && (
          <div className="secondary-modal-overlay" onClick={handleOverlayClick}>
            <div className="secondary-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="secondary-modal-header">
                <h3 className="secondary-modal-title">Approve Ticket #{ticketData.ticketNumber}</h3>
                <button
                  className="admin-ticket-modal-close-btn"
                  onClick={handleCloseModal}
                  aria-label="Close approval modal"
                >
                  &times;
                </button>
              </div>
              
              <div className="secondary-modal-body">
                <p>
                  <strong>Are you sure you want to approve this ticket?</strong>
                </p>

                <div className="form-group">
                  <label className="form-label" htmlFor="priority">Priority Level</label>
                  <select
                    id="priority"
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="department">Assign to Department</label>
                  <select
                    id="department"
                    className="form-select"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="IT Department">IT Department</option>
                    <option value="Asset Management">Asset Management</option>
                    <option value="Document Control">Document Control</option>
                    <option value="Finance & Budgeting">Finance & Budgeting</option>
                    <option value="Operations">Operations</option>
                    <option value="Facilities & Maintenance">Facilities & Maintenance</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="approvalNotes">Additional Notes (Optional)</label>
                  <textarea
                    id="approvalNotes"
                    className="form-textarea"
                    placeholder="Enter any notes..."
                    value={approvalNotes}
                    onChange={(e) => setApprovalNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="secondary-modal-actions">
                  <button 
                    className="btn secondary-btn" 
                    onClick={handleCloseModal}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn approve-btn" 
                    onClick={submitApproval}
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Approval'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTicketManagementReviewNewTicket;