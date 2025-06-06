import { useState } from "react";
import { Link } from "react-router-dom";
import CreateAccountForgotPasswordHeader from "../../components/headers/user_create-account-forgot-password-header.jsx";
import PrivacyPolicyAndTermsAndConditions from "../../components/modals/privacy-policy-and-terms-and-conditions.jsx";
import UploadedImagePreview from '../../components/modals/uploaded-image-preview.jsx';

import "./user_create-account.css";
import { Eye, EyeOff, Upload, X, ChevronDown } from "lucide-react";

const capitalizeWords = (str) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

function CreateAccount() {
  const [suffix, setSuffix] = useState("");
  const [department, setDepartment] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedUploadedImage, setSelectedUploadedImage] = useState("");
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPolicyTermsModal, setShowPolicyTermsModal] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // optionally increase to accept larger source files

    setErrors(prev => ({ ...prev, image: null }));

    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        image: 'Only JPG, JPEG, and PNG formats are allowed.',
      }));
      setPassword("");
      setConfirmPassword("");
      return;
    }

    if (file.size > maxSize) {
      setErrors(prev => ({
        ...prev,
        image: 'Image must not exceed 2MB.',
      }));
      setPassword("");
      setConfirmPassword("");
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      // Create canvas and draw resized image
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 1024, 1024);

      canvas.toBlob((blob) => {
        if (blob) {
          const resizedFile = new File([blob], file.name, { type: file.type });

          setSelectedUploadedImage(file.name);
          setUploadedImage(resizedFile);
          setFormData((prevData) => ({
            ...prevData,
            image: resizedFile,
          }));
          setErrors(prev => ({ ...prev, image: null }));
        } else {
          setErrors(prev => ({
            ...prev,
            image: 'Image processing failed. Try another image.',
          }));
          setPassword("");
          setConfirmPassword("");
        }
      }, file.type || "image/jpeg");
    };

    img.onerror = () => {
      setErrors(prev => ({
        ...prev,
        image: 'Could not read image. Please upload a valid file.',
      }));
      setPassword("");
      setConfirmPassword("");
    };

    reader.readAsDataURL(file);
  };

  const handleLabelClick = (e) => {
    e.preventDefault();
    setShowPolicyTermsModal(true); // open Privacy first
  };

  const handleAgreePrivacy = () => {
    setShowPrivacyModal(false);
    setPrivacyAgreed(true);
    setShowTermsModal(true); // Open Terms next
  };

  const handleAgreeTerms = () => {
    setShowTermsModal(false);
    setTermsAgreed(true);
  };

  const handleClosePolicyTerms = () => {
    setTermsAgreed(true);
    setShowPolicyTermsModal(false);
  };

  const getPasswordErrorMessage = (password) => {
    const messages = [];
  
    if (!password || password.trim() === "") {
        return "Please fill in the required field.";
    }

    const hasMinLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    const missing = {
      upper: !hasUpper,
      lower: !hasLower,
      digit: !hasDigit,
      special: !hasSpecial,
    };
  
    const missingKeys = Object.entries(missing)
      .filter(([_, isMissing]) => isMissing)
      .map(([key]) => key);
  
    const descriptors = {
      upper: "uppercase",
      lower: "lowercase",
      digit: "number",
      special: "special character",
    };
  
    const buildList = (items) => {
      if (items.length === 1) return descriptors[items[0]];
      if (items.length === 2)
        return `${descriptors[items[0]]} and ${descriptors[items[1]]}`;
      return (
        items
          .slice(0, -1)
          .map((key) => descriptors[key])
          .join(", ") +
        ", and " +
        descriptors[items[items.length - 1]]
      );
    };
  
    if (!hasMinLength && missingKeys.length) {
      return `Password must be at least 8 characters long and include ${buildList(
        missingKeys
      )}.`;
    } else if (!hasMinLength) {
      return "Password must be at least 8 characters long.";
    } else if (missingKeys.length) {
      return `Password must include ${buildList(missingKeys)}.`;
    }
  };

  const namePattern = /^[a-zA-Z.\-'\s]+$/;
  const letterPresencePattern = /[a-zA-Z]/;

  const validateForm = () => {
    const newErrors = {};
  
    if (!firstName.trim()) {
      newErrors.firstName = "Please fill in the required field.";
    } else if (!namePattern.test(firstName)) {
      newErrors.firstName = "Invalid character.";
    } else if (!letterPresencePattern.test(firstName)) {
      newErrors.firstName = "Invalid First Name.";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Please fill in the required field.";
    } else if (!namePattern.test(lastName)) {
      newErrors.lastName = "Invalid character.";
    } else if (!letterPresencePattern.test(lastName)) {
      newErrors.lastName = "Invalid Last Name.";
    }

    if (middleName.trim()) {
      if (!namePattern.test(middleName)) {
        newErrors.middleName = "Invalid character.";
      } else if (!letterPresencePattern.test(middleName)) {
        newErrors.middleName = "Invalid Middle Name.";
      }
    }

    if (!department) {
      newErrors.department = "Please fill in the required field.";
    }

    if (!companyId) {
      newErrors.companyId = "Please fill in the required field.";
    } else if (!/^\d{4}$/.test(companyId)) {
      newErrors.companyId = "Invalid Company ID.";
    }

    if (!email.trim()) {
      newErrors.email = "Please fill in the required field.";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      newErrors.email = "Invalid Email.";
    }

    if (!document.getElementById('privacypolicy_termsandconditions').checked) {
      newErrors.terms = "Please fill in the required field.";
    }

    if (!uploadedImage) {
      newErrors.image = "Please fill in the required field.";
    }
  
    const passwordMessage = getPasswordErrorMessage(password);
    if (passwordMessage) {
      newErrors.password = passwordMessage;
    }


    if (!confirmPassword) {
      newErrors.confirmPassword = "Please fill in the required field.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password did not matched.";
    }

    if (Object.keys(newErrors).length > 0) {
      setPassword("");
      setConfirmPassword("");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };  

 const checkBackendErrors = async (formData) => {
    const email = formData.get("email");
    const companyId = formData.get("company_id");

    // Don't check if both are empty
    if (!email && !companyId) return {};

    try {
      const response = await fetch("http://localhost:8000/api/create_employee/", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");

      const formattedErrors = {};

      if (!response.ok && contentType?.includes("application/json")) {
        const errorJson = await response.json();

        // Only set error if email was entered
        if (email && errorJson.email) {
          formattedErrors.email = "Invalid Email.";
        }

        // Only set error if company ID was entered
        if (companyId && errorJson.company_id) {
          formattedErrors.companyId = "Invalid Company ID.";
        }
      }

      return formattedErrors;
    } catch (error) {
      console.error("🚨 Network error while checking backend:", error);
      return {};
    }
  };

 const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("last_name", lastName);
    formData.append("first_name", firstName);
    formData.append("middle_name", middleName);
    formData.append("suffix", suffix);
    formData.append("company_id", `MA${companyId}`);
    formData.append("department", department);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", uploadedImage);
    formData.append("confirm_password", confirmPassword);

    // Step 1: Frontend validation
    const isValid = validateForm(); // this sets some errors already

    // Step 2: Backend error check — even if isValid is false
    const backendErrors = await checkBackendErrors(formData);

    // Step 3: Merge all errors
    if (Object.keys(backendErrors).length > 0 || !isValid) {
      setErrors((prev) => ({
        ...prev,
        ...backendErrors,
      }));

      setPassword("");
      setConfirmPassword("");
      return;
    }

    // Step 4: Submit the form
    try {
      const response = await fetch("http://localhost:8000/api/create_employee/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Submission error:", data);
        alert("Account created successfully!");
        return;
      }

      console.log("✅ Success:", data);
      alert("Account created successfully!");
    } catch (error) {
      console.error("🚨 Network error:", error);
      alert("Network error. Please check your connection and try again.");
      
      // Clear passwords on error
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <CreateAccountForgotPasswordHeader />
      <div className="create-account-form-container">
        <h2>Create Account</h2>
        <hr />
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Name fields */}
          <div className="create-account-form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last_name"  
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(capitalizeWords(e.target.value))}
            />
             {errors.lastName && <p className="error-message">{errors.lastName}</p>}
          </div>

          <div className="create-account-form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first_name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(capitalizeWords(e.target.value))}
            />
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}
          </div>

          <div className="create-account-form-group">
            <label htmlFor="middle-name">Middle Name</label>
            <input
              type="text"
              id="middle-name"
              name="middle_name"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(capitalizeWords(e.target.value))}
            />
            {errors.middleName && <p className="error-message">{errors.middleName}</p>}
          </div>

          <div className="create-account-form-group">
            <label htmlFor="suffix">Suffix</label>
            <div className="select-wrapper">
            <select
                id="suffix"
                name="suffix"
                className="suffix-select"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                style={{ color: suffix === "" ? "#7e7e7e" : "#0C0C0C" }}
              >
                <option value="" disabled hidden>
                  Suffix
                </option>
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

              <div className="select-separator"></div>

              <div className="select-chevron">
                <ChevronDown size={18} />
              </div>

              {suffix && (
                <div className="clear-suffix" 
                onClick={() => setSuffix("")}>
                  <X size={14} />
                </div>
              )}
            </div>
          </div>

          <div className="create-account-form-group">
            <label htmlFor="company-id">Company ID</label>
            <div className="company-id-wrapper">
              <span className="company-id-prefix">MA</span>
              <span className="company-id-separator"></span>
              <input
                type="text"
                id="company-id"
                name="company_id"
                placeholder="XXXX"
                value={companyId}
                autoComplete="off"
                onChange={(e) => {
                  const numeric = e.target.value.replace(/\D/g, "");
                  if (numeric.length <= 4) {
                    setCompanyId(numeric);
                  }
                }}
                maxLength={4}
                inputMode="numeric"
                className="company-id-input"
              />
            </div>

            {/* ✅ Move error message outside of the flex div */}
            {errors.companyId && <p className="error-message">{errors.companyId}</p>}
          </div>

          <div className="create-account-form-group">
            <label htmlFor="department">Department</label>
            <div className="select-wrapper">
            <select
                id="department"
                name="department"
                className="suffix-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={{ color: department === "" ? "#7e7e7e" : "#0C0C0C" }}
              >
                <option value="" disabled hidden>
                  Department
                </option>
                <option value="IT Department">IT Department</option>
                <option value="Asset Management">Asset Management</option>
                <option value="Document Control">Document Control</option>
                <option value="Finance & Budgeting">Finance & Budgeting</option>
                <option value="Operations">Operations</option>
                <option value="Facilities & Maintenance">Facilities & Maintenance</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Administration">Administration</option>
              </select>
              <div className="select-separator"></div>
              <div className="select-chevron">
                <ChevronDown size={18} />
              </div>
              {department && (
                <div className="clear-department" onClick={() => setDepartment("")}>
                  <X size={14} />
                </div>
              )}
            </div>
              {errors.department && <p className="error-message">{errors.department}</p>}
          </div>

          {/* Upload image */}
          <div className="create-account-form-group">
            <label htmlFor="upload-label">Upload Profile Image</label>
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

            {/* ✅ Error message placed correctly here */}
            {errors.image && <p className="error-message">{errors.image}</p>}
          </div>

        <UploadedImagePreview
          showModal={showImagePreviewModal}
          imageSrc={uploadedImage ? URL.createObjectURL(uploadedImage) : null}
          closeModal={() => setShowImagePreviewModal(false)}
        />

          {/* Email and password fields */}
          <div className="create-account-form-group">
            <label htmlFor="email">Email Address</label>
            <input
                type="text"
                id="email"
                name="email"
                placeholder="@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                title="Only Gmail addresses are allowed"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="create-account-form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
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
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="create-account-form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          {/* Checkbox and modal */}
          <div className="create-account-checkbox-group">
            <label htmlFor="checkbox" className="checkbox-label">
              <input
                type="checkbox"
                id="privacypolicy_termsandconditions"
                name="privacypolicy_termsandconditions"
                checked={termsAgreed}
                disabled={!termsAgreed}
                readOnly
              />
              I agree to the{" "}
              <span className="privacy-text-wrapper">
                <span
                  className="privacy-link"
                  onClick={handleLabelClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleLabelClick(e);
                  }}
                >
                  Privacy Policy
                </span>
                <span className="privacy-and"> and </span>
                <span
                  className="privacy-link"
                  onClick={handleLabelClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleLabelClick(e);
                  }}
                >
                  Terms and Conditions
                </span>
              </span>
            </label>
            {errors.terms && <p className="error-message">{errors.terms}</p>}
          </div>

          <PrivacyPolicyAndTermsAndConditions
            showModal={showPolicyTermsModal}
            closeModal={handleClosePolicyTerms}
          />

          {showPrivacyModal && <UserPrivacyPolicy onAgree={handleAgreePrivacy} />}
          {showTermsModal && <UserTermsAndConditions onAgree={handleAgreeTerms} />}

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
