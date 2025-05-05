import { useState } from "react";
import { Link } from "react-router-dom";
import CreateAccountForgotPasswordHeader from "../../../components/headers/user_create-account-forgot-password-header";
import PrivacyPolicyAndTermsAndConditions from "../../../components/modals/authentication/privacy-policy-and-terms-and-conditions.jsx";
import UploadedImagePreview from "../../../components/modals/authentication/uploaded-image-preview.jsx";
import "../../../styles/components/authentication/user_create-account.css";
import { Eye, EyeOff, Upload, X, ChevronDown } from "lucide-react";

function CreateAccount() {
  const [suffix, setSuffix] = useState('');
  const [department, setDepartment] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedUploadedImage, setSelectedUploadedImage] = useState("");
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);

  const [passwordTooltip, setPasswordTooltip] = useState(false);
  const [confirmPasswordTooltip, setConfirmPasswordTooltip] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedUploadedImage(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleLabelClick = (e) => {
    e.preventDefault();
    setShowPrivacyPolicyModal(true);
  };
  

  return (
    <>
      <CreateAccountForgotPasswordHeader />
      <div className="create-account-form-container">
        <h2>Create Account</h2>
        <hr />
        <form>
          {/* Name fields */}
          <div className="create-account-form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last_name"
              required
              placeholder="Last Name"
            />
          </div>

          <div className="create-account-form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first_name"
              required
              placeholder="First Name"
            />
          </div>

          <div className="create-account-form-group">
            <label htmlFor="middle-name">Middle Name</label>
            <input
              type="text"
              id="middle-name"
              name="middle_name"
              placeholder="Middle Name"
            />
          </div>

          {/* Gawing default is None */}
          <div className="create-account-form-group">
            <label htmlFor="suffix">Suffix</label>
            <div className="select-wrapper">
              <select
                id="suffix"
                name="suffix"
                className="suffix-select"
                style={{
                  color: suffix === '' ? '#7e7e7e' : '#0C0C0C',
                }}
              >
                <option value="" disabled hidden> Suffix </option>
                <option value="Jr.">Jr.</option>
                <option value="Sr.">Sr.</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
              </select>

              {/* Separator */}
              <div className="select-separator"></div>

              {/* Chevron */}
              <div className="select-chevron">
                <ChevronDown size={18} />
              </div>

              {/* Clear button */}
              {suffix && (
                <div className="clear-suffix" onClick={() => setSuffix('')}>
                  <X size={14} />
                </div>
              )}
            </div>
          </div>

          <div className="create-account-form-group">
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

          <div className="create-account-form-group">
            <label htmlFor="department">Department</label>
            <div className="select-wrapper">
              <select
                id="department"
                name="department"
                className="suffix-select"
                style={{
                  color: department === '' ? '#7e7e7e' : '#0C0C0C',
                }}
              >
                <option value="" disabled hidden>Department</option>
                <option value="IT">IT Department</option>
                <option value="HR">Human Resource</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
              </select>

              {/* Separator */}
              <div className="select-separator"></div>

              {/* Chevron */}
              <div className="select-chevron">
                <ChevronDown size={18} />
              </div>

              {/* Clear button */}
              {department && (
                <div className="clear-department" onClick={() => setDepartment('')}>
                  <X size={14} />
                </div>
              )}
            </div>
          </div>

          {/* Upload image */}
          <div className="create-account-form-group">
            <label htmlFor="upload-label">Upload Image</label>
            <div className="file-upload-container">
              <label
                htmlFor="image"
                className={`file-upload-btn full-clickable ${uploadedImage ? "disabled" : ""}`}
                style={uploadedImage ? { cursor: "not-allowed", opacity: 0.6 } : {}}
              >
                <Upload size={18} />
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    disabled={!!uploadedImage}
                  />
              </label>

              <span
                className={`file-name ${selectedUploadedImage ? "has-file" : ""}`}
                style={{ color: "#7e7e7e" }}
                onClick={() => {
                  if (uploadedImage) {
                    setShowImagePreviewModal(true);
                  } else {
                    const fileInput = document.getElementById("image");
                    if (fileInput) fileInput.click();
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    if (uploadedImage) {
                      setShowImagePreviewModal(true);
                    } else {
                      const fileInput = document.getElementById("image");
                      if (fileInput) fileInput.click();
                    }
                  }
                }}
              >
                {selectedUploadedImage || "Upload Image"}

                {selectedUploadedImage && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedImage(null);
                      setSelectedUploadedImage("");
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        setUploadedImage(null);
                        setSelectedUploadedImage("");
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
            showModal={showImagePreviewModal}
            imageSrc={uploadedImage}
            closeModal={() => setShowImagePreviewModal(false)}
          />

          {/* Email and password fields */}
          <div className="create-account-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email Address"
            />
          </div>

          <div className="create-account-form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="Password"
            />
              <span
                className="password-icon"
                data-tooltip={showPassword ? "Hide password" : "Show password"}
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

          <div className="create-account-form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              name="confirm_password"
              placeholder="Confirm Password"
              required
            />
              <span
                className="password-icon"
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

          {/* Checkbox and modal */}
          <div className="create-account-checkbox-group">
            <label htmlFor="checkbox" className="checkbox-label">
            <input
              type="checkbox"
              id="privacypolicy_termsandconditions"
              name="privacypolicy_termsandconditions"
              required
            />
              I agree to the{" "}
              <span
                className="privacy-link"
                onClick={handleLabelClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleLabelClick(e);
                }}
              >
                Privacy Policy and Terms and Conditions
              </span>
            </label>
          </div>

          <PrivacyPolicyAndTermsAndConditions
            showModal={showPrivacyPolicyModal}
            closeModal={() => setShowPrivacyPolicyModal(false)}
          />

          <button type="submit" className="btn-signup">
            Sign Up
          </button>

          <div className="login-link">
            Already have an account? <Link to="/login/employee">Log In</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateAccount;
