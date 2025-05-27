import { Link } from 'react-router-dom';

const AdminNavbarProfile = () => {
  return (
    <div className="profile-popup">
      <p className="profile-name">John Doe</p>
      <p className="profile-role">System Administrator</p>
      <hr/>
      <Link to="/">
        <button className="admin-logout-button">Logout</button>
      </Link>
    </div>
  );
};

export default AdminNavbarProfile;
