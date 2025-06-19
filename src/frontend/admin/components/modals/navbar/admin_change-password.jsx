import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../../../../../utilities/ticket/apiInstance';

const AdminChangePassword = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    try {
      await api.post('/employee/change-password/', {
        current_password: currentPassword,
        new_password: newPassword,
      });
      setSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        'Failed to change password.'
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <div className="password-input-wrapper">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
              />
              <span
                className="eye-icon"
                onClick={() => setShowCurrent((v) => !v)}
                style={{ cursor: 'pointer', marginLeft: 8 }}
              >
                {showCurrent ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New Password"
              />
              <span
                className="eye-icon"
                onClick={() => setShowNew((v) => !v)}
                style={{ cursor: 'pointer', marginLeft: 8 }}
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirm((v) => !v)}
                style={{ cursor: 'pointer', marginLeft: 8 }}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <button type="submit" className="btn">Submit</button>
        </form>
        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AdminChangePassword;
