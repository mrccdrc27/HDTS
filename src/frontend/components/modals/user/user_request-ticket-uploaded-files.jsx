import React from 'react';

const FilePreviewModal = ({ file, onClose }) => {
  const fileURL = URL.createObjectURL(file);

  return (
    <div className="file-preview-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h3>Preview: {file.name}</h3>
        {file.type.startsWith('image/') ? (
          <img src={fileURL} alt={file.name} style={{ width: '100%' }} />
        ) : file.type === 'application/pdf' ? (
          <embed src={fileURL} width="100%" height="500px" type="application/pdf" />
        ) : (
          <div>
            <p>Cannot preview this file type.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePreviewModal;
