const AdminProfilePopup = () => {
  return (
    <div className="profile-popup">
      <p className="profile-name">John Doe</p>
      <p className="profile-role">System Administrator</p>
      <Link to="/">
        <button className="admin-logout-button">Logout</button>
      </Link>
    </div>
  );
};

export default AdminProfilePopup;
