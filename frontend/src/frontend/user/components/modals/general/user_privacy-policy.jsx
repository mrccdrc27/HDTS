const UserPrivacyPolicy = ({ onClose }) => {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          minWidth: '300px',
          maxWidth: '600px',
          animation: 'scaleIn 0.3s ease',
        }}
      >
        <h1>Privacy Policy</h1>
        <p>
          This is where your Privacy Policy content goes. Make sure to include details about how user data is collected, used, and protected.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserPrivacyPolicy;
