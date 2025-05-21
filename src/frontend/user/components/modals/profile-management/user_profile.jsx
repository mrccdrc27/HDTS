import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import UserChangePassword from './user_change-password.jsx';

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => {
    // Go back to the background location
    navigate(-1);
  };

  const goToChangePassword = () => {
    navigate('/profile/change-password', {
      state: { backgroundLocation: location.state?.backgroundLocation || location },
    });
  };

  return (
    <div
      className="modal-overlay"
      onClick={closeModal}
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
        <Routes>
          <Route
            path="/profile"
            element={
              <>
                <h1>User Profile</h1>
                <button onClick={goToChangePassword} style={{ marginTop: 12 }}>
                  Change Password
                </button>
                <button onClick={closeModal} style={{ marginTop: 20 }}>
                  Close
                </button>
              </>
            }
          />
          <Route
            path="/profile/change-password"
            element={
              <UserChangePassword
                onBack={() => navigate('/profile', { state: { backgroundLocation: location.state?.backgroundLocation || location } })}
                onClose={closeModal}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default UserProfile;
