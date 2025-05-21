const UserChangePassword = ({ onClose, onBack }) => {
  return (
    <>
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
      <div style={{ marginTop: 16 }}>
        <button onClick={onBack} style={{ marginRight: 10 }}>
          Back
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
};

export default UserChangePassword;
