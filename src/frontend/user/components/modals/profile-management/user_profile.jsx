import { useState } from 'react';
import UserChangePassword from './user_change-password.jsx';

const UserProfile = ({ onClose }) => {
  const [changePwOpen, setChangePwOpen] = useState(false);

  const openChangePw = () => setChangePwOpen(true);
  const closeChangePw = () => setChangePwOpen(false);

  return (
    <>
      {/* Main User Profile modal */}
      <div
        className="modal-overlay"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#fff',
            padding: 24,
            borderRadius: 8,
            width: 400,
            maxWidth: '90%',
          }}
        >
          <h1>User Profile</h1>

          {/* Change Password trigger */}
          <button onClick={openChangePw} style={{ marginTop: 12 }}>
            Change Password
          </button>

          <button onClick={onClose} style={{ marginTop: 20 }}>
            Close
          </button>
        </div>
      </div>

      {/* Show Change Password modal only if toggled */}
      {changePwOpen && <UserChangePassword onClose={closeChangePw} />}
    </>
  );
};

export default UserProfile;
