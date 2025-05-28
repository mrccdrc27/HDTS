import { useState } from "react";
import UploadedImagePreview from "../../../components/modals/authentication/uploaded-image-preview.jsx";
import './admin_user-access-register-user.css';

import { Eye, EyeOff, Upload, X, ChevronDown } from "lucide-react";

const capitalizeWords = (str) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

function CreateAccount() {
  // Form field states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedUploadedImage, setSelectedUploadedImage] = useState("");
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
  const [department, setDepartment] = useState('');
  const [suffix, setSuffix] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});

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

    if (!role) {
      newErrors.role = "Please fill in the required field.";
    }

    if (!companyId) {
      newErrors.companyId = "Please fill in the required field.";
    } else if (!/^\d{4}$/.test(companyId)) {
      newErrors.companyId = "Invalid Company ID.";
    }

    if (!email.trim()) {
      newErrors.email = "Please fill in the required field.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Invalid Email.";
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
    formData.append("role", role);
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
        alert("User registered successfully!");
        
        // Reset form after successful submission
        setFirstName("");
        setLastName("");
        setMiddleName("");
        setSuffix("");
        setCompanyId("");
        setDepartment("");
        setRole("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUploadedImage(null);
        setSelectedUploadedImage("");
        return;
      }

      console.log("✅ Success:", data);
      alert("User registered successfully!");
      
      // Reset form after successful submission
      setFirstName("");
      setLastName("");
      setMiddleName("");
      setSuffix("");
      setCompanyId("");
      setDepartment("");
      setRole("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUploadedImage(null);
      setSelectedUploadedImage("");
    } catch (error) {
      console.error("🚨 Network error:", error);
      alert("Network error. Please check your connection and try again.");
      
      // Clear passwords on error
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="register-user-form-container">
      <h2>Register New User</h2>
      <hr />
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Name fields */}
        <div className="register-user-form-group">
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

        <div className="register-user-form-group">
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

        <div className="register-user-form-group">
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
          <label htmlFor="company-id">Company ID</label>
          <div className="company-id-wrapper">
            <span className="company-id-prefix">MA</span>
            <div className="company-id-separator"></div>
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
          {errors.role && <p className="error-message">{errors.role}</p>}
        </div>

        {/* Upload image */}
        <div className="register-user-form-group">
          <label htmlFor="upload-label">Upload Profile Image</label>
          <div className="register-user-file-upload-container">
            <label
              htmlFor="image"
              className={`register-user-file-upload-btn full-clickable ${uploadedImage ? "disabled" : ""}`}
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
              className={`register-user-file-name ${selectedUploadedImage ? "has-file" : ""}`}
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

        <div className="register-user-form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="text" 
            id="email" 
            name="email"
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="register-user-form-group">
          <label htmlFor="password">Password</label>
          <div className="register-user-password-wrapper">
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
              className="register-user-password-icon"
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

        <div className="register-user-form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="register-user-password-wrapper">
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
              className="register-user-password-icon"
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

        <div className="register-user-button-group">
          <button type="button" className="btn-cancel-register-user">Cancel</button>
          <button type="submit" className="btn-register-user">Register</button>
        </div>

      </form>
    </div>
  );
}

export default CreateAccount;