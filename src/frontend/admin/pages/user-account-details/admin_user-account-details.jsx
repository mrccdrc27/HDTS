import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserById } from '/src/utilities/storage/userStorage.js';
import AdminUserAccountAuditLog from './admin_user-account-audit-log';

const AdminUserAccountDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (userId) {
      try {
        const fetchedUser = getUserById(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
  }, [userId]);

  const handleImageError = () => {
    setImageError(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#28a745'; // Green
      case 'inactive':
        return '#dc3545'; // Red
      case 'pending':
        return '#ffc107'; // Yellow
      default:
        return '#6c757d'; // Gray
    }
  };

  const formatFullName = (user) => {
    const parts = [
      user.firstName,
      user.middleName,
      user.lastName,
      user.suffix
    ].filter(part => part && part.trim() !== '');
    
    return parts.join(' ');
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Loading user details...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ color: '#dc3545', fontSize: '18px' }}>
          User not found
        </div>
        <p>The user with ID "{userId}" could not be found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>
        Admin User Account Details
      </h1>
      
      <div className="user-details" style={{ 
        display: 'grid', 
        gap: '20px',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'start'
      }}>
        {/* Profile Image Section */}
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginBottom: '20px' }}>
          {user.profileImage && !imageError ? (
            <img
              src={user.profileImage}
              alt={`${user.firstName} ${user.lastName}`}
              onError={handleImageError}
              style={{ 
                width: '150px', 
                height: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '4px solid #e9ecef',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            />
          ) : (
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              backgroundColor: '#e9ecef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              fontSize: '48px',
              color: '#6c757d',
              fontWeight: 'bold'
            }}>
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </div>
          )}
        </div>

        {/* User Information Grid */}
        <div style={{ gridColumn: '1 / -1', display: 'grid', gap: '15px' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>
            <strong style={{ minWidth: '140px', color: '#495057' }}>ID:</strong>
            <span style={{ fontFamily: 'monospace', backgroundColor: '#f8f9fa', padding: '2px 6px', borderRadius: '3px' }}>
              {user.id}
            </span>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>
            <strong style={{ minWidth: '140px', color: '#495057' }}>Company ID:</strong>
            <span style={{ fontFamily: 'monospace', backgroundColor: '#f8f9fa', padding: '2px 6px', borderRadius: '3px' }}>
              {user.companyId}
            </span>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>
            <strong style={{ minWidth: '140px', color: '#495057' }}>Full Name:</strong>
            <span style={{ fontSize: '16px', fontWeight: '500' }}>
              {formatFullName(user)}
            </span>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>
            <strong style={{ minWidth: '140px', color: '#495057' }}>Department:</strong>
            <span>{user.department}</span>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>
            <strong style={{ minWidth: '140px', color: '#495057' }}>Role:</strong>
            <span style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              padding: '4px 8px', 
              borderRadius: '12px', 
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {user.role}
            </span>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>
            <strong style={{ minWidth: '140px', color: '#495057' }}>Status:</strong>
            <span style={{
              backgroundColor: getStatusColor(user.status),
              color: 'white',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              textTransform: 'uppercase'
            }}>
              {user.status}
            </span>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>
            <strong style={{ minWidth: '140px', color: '#495057' }}>Date Created:</strong>
            <span>{new Date(user.dateCreated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>
            <strong style={{ minWidth: '140px', color: '#495057' }}>Email:</strong>
            <a 
              href={`mailto:${user.email}`}
              style={{ 
                color: '#007bff', 
                textDecoration: 'none',
                borderBottom: '1px solid transparent'
              }}
              onMouseOver={(e) => e.target.style.borderBottomColor = '#007bff'}
              onMouseOut={(e) => e.target.style.borderBottomColor = 'transparent'}
            >
              {user.email}
            </a>
          </div>
        </div>
      </div>

      <hr style={{ margin: '40px 0', border: 'none', borderTop: '2px solid #e9ecef' }} />
      
      <div>
        <AdminUserAccountAuditLog userId={user.id} />
      </div>
    </div>
  );
};

export default AdminUserAccountDetails;