 import { Outlet } from 'react-router-dom';

const UserModalLayout = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          padding: 24,
          borderRadius: 8,
          width: 400,
          maxWidth: '90%',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default UserModalLayout;
