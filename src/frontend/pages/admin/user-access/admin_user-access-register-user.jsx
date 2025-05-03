import { useState } from "react";
import UploadedImagePreview from "../../../components/modals/authentication/uploaded-image-preview.jsx";
import "../../../styles/components/pages/admin/admin_user-access-register-user.css"; // Renamed CSS file
import { Eye, EyeOff, Upload, X } from "lucide-react";

function RegisterUser() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [profileImageName, setProfileImageName] = useState("");
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  const [department, setDepartment] = useState('');
  const [suffix, setSuffix] = useState('');
  const [role, setRole] = useState('');
 
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
        ;
        <div className="register-user-form-group">
          <label htmlFor="suffix">Suffix</label>
          <select
            id="suffix"
            name="suffix"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            style={{
              color: suffix === '' ? '#7e7e7e' : '#0C0C0C'
            }}
          >
            <option value="">Suffix</option>
            <option value="Jr.">Jr.</option>
            <option value="Sr.">Sr.</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
            <option value="None">None</option>
          </select>
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
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={{
              color: department === '' ? '#7e7e7e' : '#0C0C0C'
            }}
          >
            <option value="">Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        {/* Role Dropdown */}
        <div className="register-user-form-group">
          <label htmlFor="role-selection">User Role</label>
          <select
            id="role-selection"
            name="role_selection"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              color: role === '' ? '#7e7e7e' : '#0C0C0C'
            }}
          >
            <option value="">User Role</option>
            <option value="Employee">Employee</option>
            <option value="Ticket Admin">Ticket Admin</option>
            <option value="System Admin">System Admin</option>
          </select>
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
      {profileImageName || "Attach Image"}

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

        {/* Email and Password Fields */}
        <div className="register-user-form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required placeholder="Email Address" />
        </div>

        <div className="register-user-form-group">
          <label htmlFor="password">Password</label>
          <div className="register-user-password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Password"
            />
            <span
              className="password-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setPasswordVisible(!passwordVisible);
              }}
            >
              {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div className="register-user-form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="password-container">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              name="confirm_password"
              placeholder="Confirm Password"
              required
            />
            <span
              className="password-icon"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setConfirmPasswordVisible(!confirmPasswordVisible);
              }}
            >
              {confirmPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <button type="submit" className="btn-register-user">
          Register User
        </button>
      </form>
    </div>
  );
}

export default RegisterUser;
