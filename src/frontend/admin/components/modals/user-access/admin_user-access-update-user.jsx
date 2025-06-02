import React, { useState } from 'react';
import './admin_user-access-update-user.css';

const UpdateModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    middleName: user?.middleName || '',
    suffix: user?.suffix || '',
    companyId: user?.companyId || '',
    department: user?.department || '',
    accountStatus: user?.accountStatus || 'Active',
    email: user?.email || '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState(''); // 'save' or 'cancel'

  if (!user) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveClick = () => {
    setConfirmationType('save');
    setShowConfirmation(true);
  };

  const handleCancelClick = () => {
    setConfirmationType('cancel');
    setShowConfirmation(true);
  };

  const handleConfirmSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
    };
    if (onUpdate) onUpdate(updatedUser);
    setShowConfirmation(false);
    onClose();
  };

  const handleConfirmCancel = () => {
    setShowConfirmation(false);
    onClose();
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const ConfirmationModal = () => (
    <div className="confirmation-backdrop" onClick={handleConfirmationClose}>
      <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-header">
          <h2>
            {confirmationType === 'save' ? 'Save Changes?' : "Don't Save?"}
          </h2>
        </div>
        
        <div className="confirmation-content">
          <p>
            {confirmationType === 'save' 
              ? 'Are you sure you want to save these changes to the user account?'
              : 'Are you sure you want to cancel? Any unsaved changes will be lost.'
            }
          </p>
        </div>
        
        <div className="confirmation-actions">
          <button 
            className="confirmation-secondary-btn" 
            onClick={handleConfirmationClose}
          >
            No, Go Back
          </button>
          <button 
            className={`confirmation-primary-btn ${confirmationType === 'save' ? 'save' : 'cancel'}`}
            onClick={confirmationType === 'save' ? handleConfirmSave : handleConfirmCancel}
          >
            {confirmationType === 'save' ? 'Yes, Save Changes' : 'Yes, Cancel'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="modal-backdrop" onClick={handleCancelClick}>
        <div className="modal-contentview update-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={handleCancelClick}>×</button>

          <div className="update-header">
            <h1>Update User Account</h1>
          </div>

          <div className="update-content">
            <div className="form-layout">
              {/* Avatar Section */}
              <div className="avatar-section">
                <div className="user-avatar">
                  <img 
                    src={user.avatar || "/api/placeholder/80/80"} 
                    alt="User Avatar" 
                    className="avatar-image"
                  />
                </div>
              </div>

              {/* Form Fields Section */}
              <div className="form-fields">
                {/* Name Row */}
                <div className="name-row">
                  <div className="field-group">
                    <label>Last Name:</label>
                    <input 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="form-input"
                      readOnly 
                    />
                  </div>
                  <div className="field-group">
                    <label>First Name:</label>
                    <input 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="form-input"
                      readOnly 
                    />
                  </div>
                  <div className="field-group">
                    <label>Middle Name:</label>
                    <input 
                      value={formData.middleName}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
                      className="form-input"
                      readOnly
                    />
                  </div>
                  <div className="field-group">
                    <label>Suffix:</label>
                    <input 
                      value={formData.suffix}
                      onChange={(e) => handleInputChange('suffix', e.target.value)}
                      className="form-input"
                      readOnly
                    />
                  </div>
                </div>

                {/* Company and Department Row */}
                <div className="details-row">
                  <div className="field-group">
                    <label>Company ID:</label>
                    <input 
                      value={formData.companyId}
                      onChange={(e) => handleInputChange('companyId', e.target.value)}
                      className="form-input"
                      readOnly
                    />
                  </div>
                  <div className="field-group">
                    <label>Department:</label>
                    <input 
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="form-input"
                      readOnly
                    />
                  </div>

                  <div className="field-group">
                    <label>Email address:</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="form-input"
                      readOnly 
                    />
                  </div>
                </div>

                <div className="status-email-row">
                  <div className="field-group">
                    <label>Account Status:</label>
                    <div className="select-wrapper">
                      <select
                        value={formData.accountStatus}
                        onChange={(e) => handleInputChange('accountStatus', e.target.value)}
                        className="custom-select"
                      >
                        <option value="">Select status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                      <span className="dropdown-icon">&#9662;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="update-actions">
              <button type="button" className="reject-btn" onClick={handleCancelClick}>Cancel</button>
              <button type="button" className="approve-btn" onClick={handleSaveClick}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && <ConfirmationModal />}
    </>
  );
};

export default UpdateModal;