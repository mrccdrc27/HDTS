const UserTermsAndConditions = ({ onClose }) => {
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
        <h1>Terms and Conditions</h1>
        <p>
          This is where your Terms and Conditions content goes. It should include rules, obligations, and disclaimers regarding the use of the application.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserTermsAndConditions;
