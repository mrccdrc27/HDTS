// src/frontend/components/popups/ErrorPopup.jsx
import { XCircle } from "lucide-react";
import "../../styles/components/popups/error-popup.css"; // (create this css too later)

const ErrorPopup = ({ errors, onClose }) => {
    return (
        <div className="error-popup">
            <div className="popup-content">
                <button 
                    className="close-popup"
                    onClick={onClose}
                >
                    <XCircle size={20} />
                </button>
                <h3>Please fix these errors:</h3>
                <ul>
                    {errors.email && <li>{errors.email}</li>}
                    {errors.password && <li>{errors.password}</li>}
                </ul>
            </div>
        </div>
    );
};

export default ErrorPopup;
