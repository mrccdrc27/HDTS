import { useState } from "react";
import UploadedImagePreview from "../../../components/modals/authentication/uploaded-image-preview.jsx";
import "../../../styles/components/pages/admin/admin_user-access-register-user.css";
import { Eye, EyeOff, Upload, X, ChevronDown } from "lucide-react";

function RegisterUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [profileImageName, setProfileImageName] = useState("");
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  const [department, setDepartment] = useState('');
  const [suffix, setSuffix] = useState('');
  const [role, setRole] = useState('');

  const [passwordTooltip, setPasswordTooltip] = useState(false);
  const [confirmPasswordTooltip, setConfirmPasswordTooltip] = useState(false);

  const handleProfileImageSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImageName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="register-user-form-container">
      <h2>Register New User</h2>
      <hr />
      <form>
        {/* Name fields */}
        <div className="register-user-form-group">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last_name" required placeholder="Last Name" />
        </div>

        <div className="register-user-form-group">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first_name" required placeholder="First Name" />
        </div>

        <div className="register-user-form-group">
          <label htmlFor="middle-name">Middle Name</label>
          <input type="text" id="middle-name" name="middle_name" placeholder="Middle Name" />
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
              style={{
                color: suffix === '' ? '#7e7e7e' : '#0C0C0C',
              }}
            >
              <option value="" disabled hidden>Suffix</option>
              <option value="Jr.">Jr.</option>
              <option value="Sr.">Sr.</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
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
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="suffix-select"
              style={{
                color: department === '' ? '#7e7e7e' : '#0C0C0C',
              }}
            >
              <option value="" disabled hidden>Department</option>
              <option value="IT Department">IT Department</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
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
        </div>
        
        <div className="register-user-form-group">
          <label htmlFor="company-id">Company ID</label>
          <input
            type="text"
            id="company-id"
            name="company_id"
            required
            placeholder="Company ID"
            maxLength={5}
            pattern="\d*"
            inputMode="numeric"
          />
        </div>

        <div className="register-user-form-group">
          <label htmlFor="role-selection">User Role</label>
          <div className="register-user-select-wrapper">
            <select
              id="role-selection"
              name="role_selection"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="register-user-suffix-select"
              style={{
                color: role === '' ? '#7e7e7e' : '#0C0C0C',
              }}
            >
              <option value="" disabled hidden>User Role</option>
              <option value="Employee">Employee</option>
              <option value="Ticket Agent">Ticket Agent</option>
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
        </div>

        {/* Image Upload */}
        <div className="register-user-form-group">
          <label htmlFor="image-upload">Upload Profile Picture</label>
          <div className="register-user-file-upload-container">
            <label
              htmlFor="image"
              className={`register-user-file-upload-btn full-clickable ${profileImagePreview ? "disabled" : ""}`}
              style={profileImagePreview ? { cursor: "not-allowed", opacity: 0.6 } : {}}
            >
              <Upload size={18} className="upload-icon" />
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                required
                onChange={handleProfileImageSelection}
                style={{ display: "none" }}
                disabled={!!profileImagePreview}
              />
            </label>

            <span
              className="register-user-file-name"
              style={{ color: '#7e7e7e' }}
              onClick={() => {
                if (profileImagePreview) {
                  setShowProfileImageModal(true);
                } else {
                  const fileInput = document.getElementById("image");
                  if (fileInput) fileInput.click();
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  if (profileImagePreview) {
                    setShowProfileImageModal(true);
                  } else {
                    const fileInput = document.getElementById("image");
                    if (fileInput) fileInput.click();
                  }
                }
              }}
            >
              {profileImageName || "Upload Profile Picture"}

              {profileImageName && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileImagePreview(null);
                    setProfileImageName("");
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      setProfileImagePreview(null);
                      setProfileImageName("");
                    }
                  }}
                >
                  <X size={18} />
                </span>
              )}
            </span>
          </div>
        </div>

        <UploadedImagePreview
          showModal={showProfileImageModal}
          imageSrc={profileImagePreview}
          closeModal={() => setShowProfileImageModal(false)}
        />

        <div className="register-user-form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required placeholder="Email Address" />
        </div>

        <div className="register-user-form-group">
          <label htmlFor="password">Password</label>
          <div className="register-user-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Password"
            />
            <span
              className="register-user-password-icon"
              data-tooltip={showPassword ? "Hide Password" : "Show Password"}
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div className="register-user-form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="register-user-password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              name="confirm_password"
              placeholder="Confirm Password"
              required
            />
            <span
              className="register-user-password-icon"
              data-tooltip={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setShowConfirmPassword(!showConfirmPassword);
              }}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div class="register-user-button-group">
          <button class="btn-cancel-register-user">Cancel</button>
          <button class="btn-register-user">Register</button>
        </div>

      </form>
    </div>
  );
}

export default RegisterUser;
