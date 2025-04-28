import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CreateAccountForgotPasswordHeader from "../../../components/headers/user_create-account-forgot-password-header";
import "../../../styles/components/authentication/user_create-account.css";
import { saveUser, isEmailTaken } from "../../../services/user-services/userCreateAccount.js"; 

function CreateAccount() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (formData) => {
    const newErrors = {};
    const newUser = {
      last_name: formData.get("last_name"),
      first_name: formData.get("first_name"),
      middle_name: formData.get("middle_name"),
      suffix: formData.get("suffix"),
      company_id: formData.get("company_id"),
      department: formData.get("department"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
      image: formData.get("image"),
    };

    // Required field validation
    if (!newUser.last_name) newErrors.last_name = "Last name is required";
    if (!newUser.first_name) newErrors.first_name = "First name is required";
    if (!newUser.company_id) newErrors.company_id = "Company ID is required";
    if (!newUser.department) newErrors.department = "Department is required";
    
    // Email validation
    if (!newUser.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (isEmailTaken(newUser.email)) {
      newErrors.email = "Email is already taken";
    }

    // Password validation
    if (!newUser.password) {
      newErrors.password = "Password is required";
    } else if (newUser.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!newUser.confirm_password) {
      newErrors.confirm_password = "Please confirm your password";
    } else if (newUser.password !== newUser.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    // Checkbox validation
    if (!formData.get("privacypolicy")) {
      newErrors.privacypolicy = "You must agree to the privacy policy";
    }
    if (!formData.get("termsofconditions")) {
      newErrors.termsandconditions = "You must agree to the terms and conditions";
    }

    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors, newUser };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const { isValid, errors: validationErrors, newUser } = validateForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Save user to localStorage
      saveUser(newUser);
      // Navigate to the user home page after successful sign-up
      navigate("/user/home");
    } catch (error) {
      setErrors({ ...errors, form: "An error occurred during registration. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <CreateAccountForgotPasswordHeader />

      <div className="form-container">
        <h2>Create Account</h2>
        {errors.form && <div className="error-message">{errors.form}</div>}
        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input 
              type="text" 
              id="last-name" 
              name="last_name" 
              required 
              className={errors.last_name ? "error" : ""}
            />
            {errors.last_name && <span className="error-message">{errors.last_name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input 
              type="text" 
              id="first-name" 
              name="first_name" 
              required 
              className={errors.first_name ? "error" : ""}
            />
            {errors.first_name && <span className="error-message">{errors.first_name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="middle-name">Middle Name</label>
            <input type="text" id="middle-name" name="middle_name" />
          </div>
          <div className="form-group">
            <label htmlFor="suffix">Suffix</label>
            <input type="text" id="suffix" name="suffix" />
          </div>
          <div className="form-group">
            <label htmlFor="company-id">Company ID</label>
            <input 
              type="text" 
              id="company-id" 
              name="company_id" 
              required 
              className={errors.company_id ? "error" : ""}
            />
            {errors.company_id && <span className="error-message">{errors.company_id}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input 
              type="text" 
              id="department" 
              name="department" 
              required 
              className={errors.department ? "error" : ""}
            />
            {errors.department && <span className="error-message">{errors.department}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input type="file" id="image" name="image" accept="image/*" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              className={errors.password ? "error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirm_password" 
              required 
              className={errors.confirm_password ? "error" : ""}
            />
            {errors.confirm_password && <span className="error-message">{errors.confirm_password}</span>}
          </div>
          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="privacypolicy" 
              name="privacypolicy" 
              required 
              className={errors.privacypolicy ? "error" : ""}
            />
            <label htmlFor="privacypolicy">
              I agree to the <Link to="/privacy-policy">Privacy Policy</Link>
            </label>
            {errors.privacypolicy && <span className="error-message">{errors.privacypolicy}</span>}
          </div>
          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="termsandconditions" 
              name="termsofconditions" 
              required 
              className={errors.termsandconditions ? "error" : ""}
            />
            <label htmlFor="termsandconditions">
              I agree to the <Link to="/terms-conditions">Terms and Conditions</Link>
            </label>
            {errors.termsandconditions && <span className="error-message">{errors.termsandconditions}</span>}
          </div>

          <div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login/employee">Log In</Link>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;