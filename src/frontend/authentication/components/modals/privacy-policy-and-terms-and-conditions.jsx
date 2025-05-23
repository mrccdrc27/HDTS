// Modal.js
import React from "react";
import "./privacy-policy-and-terms-and-conditions.css";

const PrivacyPolicyAndTermsAndConditions = ({ showModal, closeModal }) => {
  if (!showModal) return null; // Don't render modal if showModal is false

  return (
    <div className={`privacy-policy-and-terms-and-conditions-modal-overlay ${showModal ? 'show' : ''}`}>
      <div className="privacy-policy-and-terms-and-conditions-modal-content">
        <h2>Privacy Policy and Terms and Conditions</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at
          lacus ac velit ornare lobortis. Donec venenatis vulputate lorem.
        </p>
        <button onClick={closeModal} className="close-modal-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicyAndTermsAndConditions;
