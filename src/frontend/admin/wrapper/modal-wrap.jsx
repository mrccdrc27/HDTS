// components/ui/Modal.js
import { useEffect } from 'react';
import './modal-wrap.css'; // your modal styles

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    // Close modal on Escape key press
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose} // clicking outside closes the modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal content
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
