const ModalWrapper = ({ onClose, children }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose} className="btn btn-primary">Close</button>
      </div>
    </div>
  );
};

export default ModalWrapper;
