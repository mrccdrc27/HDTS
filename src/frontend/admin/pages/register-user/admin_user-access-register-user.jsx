import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import './admin_user-access-register-user.css';

function CreateAccount() {
  // Form field states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  
  // UI states
  const [department, setDepartment] = useState('');
  const [suffix, setSuffix] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // NEW: Confirmation modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!firstName) {
      newErrors.firstName = "Please fill the required field.";
    }
    
    if (!lastName) {
      newErrors.lastName = "Please fill the required field.";
    }

    if (!email) {
      newErrors.email = "Please fill the required field.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Invalid Email.";
    }
    
    if (!department) {
      newErrors.department = "Please fill the required field.";
    }
    
    if (!role) {
      newErrors.role = "Please fill the required field.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const token = localStorage.getItem("adminAuthToken");
      if (!token) throw new Error("Authentication required. Please login again.");

      const formData = new FormData();
      formData.append("email", email);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("middle_name", middleName);
      formData.append("suffix", suffix);
      formData.append("department", department);
      formData.append("role", role);
      // If you have an image input:
      // formData.append("image", imageFile);  <-- must be a File object

      const response = await fetch("http://localhost:8000/api/admin/create-employee/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
          // DON'T include "Content-Type" here — fetch will auto-set it for FormData
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        handleApiErrors(data);
        return;
      }

      handleSuccessResponse(data);

    } catch (err) {
      console.error("Submission error:", err);
      setErrors({
        general: err.message || "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions
  const handleApiErrors = (data) => {
    if (data.email) {
      setErrors({ email: data.email[0] });
    } else if (data.error) {
      setErrors({ general: data.error });
    } else {
      setErrors({
        general: `Server error: ${JSON.stringify(data)}`
      });
    }
  };

  const handleSuccessResponse = (data) => {
    alert(`Account created successfully. Company ID: ${data.company_id}`);
    // Reset form
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setSuffix("");
    setDepartment("");
    setRole("");
    setEmail("");
  };

  // Handle cancel with confirmation
  const handleCancel = () => {
    setConfirmMessage('All unsaved changes will be lost.');
    setConfirmAction(() => () => {
      // Reset form
      setFirstName("");
      setLastName("");
      setMiddleName("");
      setSuffix("");
      setDepartment("");
      setRole("");
      setEmail("");
      setErrors({});
      setShowConfirmModal(false);
    });
    setShowConfirmModal(true);
  };

  // Handle register with confirmation
  const handleRegister = (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    console.log('Validation passed')
    
    setConfirmMessage(`Are you sure you want to register this user?

  • Company ID will be auto-generated
  • Default password will be set to "1234"
  • User will receive an email with approval instructions
  • User cannot log in until they approve via email

  Please verify all information is correct.`);
      setConfirmAction(() => () => {
        setShowConfirmModal(false);
        handleSubmit(event);
      });
      setShowConfirmModal(true);
    };

  // Confirmation Modal Component
  const ConfirmationModal = () => {
    if (!showConfirmModal) return null;

    return (
      <div className="confirmation-modal-overlay">
        <div className="confirmation-modal">
          <div className="confirmation-modal-header">
            <h3>Confirm Action</h3>
          </div>
          <div className="confirmation-modal-body">
            <p style={{ whiteSpace: 'pre-line' }}>{confirmMessage}</p>
          </div>
          <div className="confirmation-modal-footer">
            <button 
              type="button" 
              className="btn-confirm-cancel"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-confirm-proceed"
              onClick={() => {
                if (confirmAction) confirmAction();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="register-user-form-container">
      <h2>Register New User Account</h2>
      <hr />
      <form onSubmit={handleRegister}>
        {/* Name fields */}
        <div className="register-user-form-group">
          <label htmlFor="last-name">Last Name</label>
          <input 
            type="text" 
            id="last-name" 
            name="last_name"
            placeholder="Last Name" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>

        <div className="register-user-form-group">
          <label htmlFor="first-name">First Name</label>
          <input 
            type="text" 
            id="first-name" 
            name="first_name"
            placeholder="First Name" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        <div className="register-user-form-group">
          <label htmlFor="middle-name">Middle Name</label>
          <input 
            type="text" 
            id="middle-name" 
            name="middle_name" 
            placeholder="Middle Name" 
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>
        
        <div className="register-user-form-group">
          <label htmlFor="suffix">Suffix</label>
          <div className="register-user-select-wrapper">
            <select
              id="suffix"
              name="suffix"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="register-user-suffix-select"
              style={{ color: suffix === '' ? '#7e7e7e' : '#0C0C0C' }}
            >
              <option value="" disabled hidden>Suffix</option>
              <option value="Jr.">Jr.</option>
              <option value="Sr.">Sr.</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
              <option value="IX">IX</option>
              <option value="X">X</option>
            </select>

            <div className="register-user-select-separator"></div>

            <div className="register-user-select-chevron">
              <ChevronDown size={18} />
            </div>

            {suffix && (
              <div
                className="register-user-clear-suffix"
                onClick={() => setSuffix('')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSuffix('');
                  }
                }}
              >
                <X size={14} />
              </div>
            )}
          </div>
        </div>

        <div className="register-user-form-group">
          <label htmlFor="department">Department</label>
          <div className="register-user-select-wrapper">
            <select
              id="department"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="suffix-select"
              style={{ color: department === '' ? '#7e7e7e' : '#0C0C0C' }}
            >
              <option value="" disabled hidden>Department</option>
              <option value="IT Department">IT Department</option>
              <option value="Asset Management">Asset Management</option>
              <option value="Document Control">Document Control</option>
              <option value="Finance & Budgeting">Finance & Budgeting</option>
              <option value="Operations">Operations</option>
              <option value="Facilities & Maintenance">Facilities & Maintenance</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Administration">Administration</option>
            </select>

            <div className="register-user-select-separator"></div>

            <div className="register-user-select-chevron">
              <ChevronDown size={18} />
            </div>

            {department && (
              <div
                className="register-user-clear-department"
                onClick={() => setDepartment('')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setDepartment('');
                  }
                }}
              >
                <X size={14} />
              </div>
            )}
          </div>
          {errors.department && <p className="error-message">{errors.department}</p>}
        </div>
        
        <div className="register-user-form-group">
          <label htmlFor="role-selection">User Role</label>
          <div className="register-user-select-wrapper">
            <select
              id="role-selection"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="register-user-suffix-select"
              style={{ color: role === '' ? '#7e7e7e' : '#0C0C0C' }}
            >
              <option value="" disabled hidden>User Role</option>
              <option value="Employee">Employee</option>
              <option value="Ticket Coordinator">Ticket Coordinator</option>
              <option value="System Admin">System Admin</option>
            </select>

            <div className="register-user-select-separator"></div>

            <div className="register-user-select-chevron">
              <ChevronDown size={18} />
            </div>

            {role && (
              <div
                className="register-user-clear-role"
                onClick={() => setRole('')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setRole('');
                  }
                }}
              >
                <X size={14} />
              </div>
            )}
          </div>
          {errors.role && <p className="error-message">{errors.role}</p>}
        </div>

        <div className="register-user-form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        {/* Info section about auto-generated fields
        <div className="register-user-info-section">
          <div className="register-user-info-box">
            <h4>Auto-Generated Settings</h4>
            <ul>
              <li><strong>Company ID:</strong> Will be auto-generated (e.g., MA0001, MA0002, etc.)</li>
              <li><strong>Profile Image:</strong> Default image will be assigned (user can change later)</li>
              <li><strong>Password:</strong> Default password "1234" (user must change on first login)</li>
              <li><strong>Account Status:</strong> Pending approval via email confirmation</li>
            </ul>
          </div>
        </div> */}

        {errors.general && <p className="error-message">{errors.general}</p>}

        <div className="register-user-button-group">
          <button 
            type="button" 
            className="btn-cancel-register-user" 
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-register-user"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>

      </form>

      {/* Confirmation Modal */}
      <ConfirmationModal />
    </div>
  );
}

export default CreateAccount;