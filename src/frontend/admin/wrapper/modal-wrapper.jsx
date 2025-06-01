import './modal-wrapper.css';

const ModalWrapper = ({ onClose, children, modalType }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content${modalType ? ` modal-${modalType}` : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
