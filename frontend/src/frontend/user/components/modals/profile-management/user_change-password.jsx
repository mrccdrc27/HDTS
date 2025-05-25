const UserChangePassword = ({ onClose }) => (
  <div
    onClick={onClose}
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1100,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: '#fff',
        padding: 24,
        borderRadius: 8,
        width: 360,
        maxWidth: '90%',
      }}
    >
      <h2>Change Password</h2>
      <form>
        <label>
          Current Password
          <input type="password" name="current" required />
        </label>
        <label>
          New Password
          <input type="password" name="next" required />
        </label>
        <label>
          Confirm New Password
          <input type="password" name="confirm" required />
        </label>
        <button type="submit" style={{ marginTop: 12 }}>
          Submit
        </button>
      </form>
      <button onClick={onClose} style={{ marginTop: 16 }}>
        Close
      </button>
    </div>
  </div>
);

export default UserChangePassword;