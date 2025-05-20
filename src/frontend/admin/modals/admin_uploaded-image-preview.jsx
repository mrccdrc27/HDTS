import React, { useState, useEffect } from "react";
import "../../../styles/components/modals/admin/admin_uploaded-image-preview.css";

function AdminUploadedImagePreview({ showModal, imageSrc, closeModal }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (showModal) {
      // Center the modal initially
      const centerX = window.innerWidth / 2 - 200; // Adjust width
      const centerY = window.innerHeight / 2 - 200; // Adjust height
      setPosition({ x: centerX, y: centerY });
    }
  }, [showModal]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!showModal) return null;

  return (
    <div
      className="uploaded-image-preview-modal-overlay"
      onClick={closeModal}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="uploaded-image-preview-modal-content floatable"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded Preview" className="modal-image" />
        ) : (
          <p>No image uploaded.</p>
        )}
      </div>
    </div>
  );
}

export default AdminUploadedImagePreview;
