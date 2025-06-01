const AdminChangePassword = ({ onClose, userId }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>Change Password for User: {userId}</h1>

        {/* Replace this with actual password form */}
        <input type="password" placeholder="New Password" />
        <button>Submit</button>

        <button className="modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AdminChangePassword;
