import { useState } from "react";
import axios from "axios";

function CreateAccount() {
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    middle_name: "",
    suffix: "",
    company_id: "",
    department: "",
    email: "",
    password: "",
    confirm_password: "",
    privacypolicy: false,
    termsofconditions: false,
  });

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return (
      password.length >= minLength &&
      hasUpper &&
      hasLower &&
      hasDigit &&
      hasSpecial
    );
  };  

  const suffixOptions = ["", "Jr", "Sr", "II", "III", "IV", "V", "VI", "Other"];
  const [selectedSuffix, setSelectedSuffix] = useState("");
  const [customSuffix, setCustomSuffix] = useState("");
  const [suffixError, setSuffixError] = useState("");

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const departments = [
    "IT Department",
    "Asset Management",
    "Document Control",
    "Finance & Budgeting",
    "Operations",
    "Facilities & Maintenance",
    "Human Resources",
    "Administration",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirm_password) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!image) {
      setMessage("Image is required.");
      return;
    }

    if (!formData.privacypolicy || !formData.termsofconditions) {
      setMessage("You must agree to the Privacy Policy and Terms.");
      return;
    }

    // Validate suffix
    if (selectedSuffix === "Other") {
      if (!customSuffix || customSuffix.length > 20) {
        setSuffixError("❌ Suffix is invalid");
        return;
      }
      setFormData((prev) => ({ ...prev, suffix: customSuffix }));
    } else {
      if (selectedSuffix.length > 20) {
        setSuffixError("❌ Suffix is invalid");
        return;
      }
      setFormData((prev) => ({ ...prev, suffix: selectedSuffix }));
    }

    // Prepend "MA" to company_id
    const fullCompanyId = "MA" + formData.company_id.padStart(4, "0");
    // formData.company_id = fullCompanyId;

    if (!validatePassword(formData.password)) {
      setMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }    

    // Prepare form data for multipart/form-data
    const payload = new FormData();
    for (const key in formData) {
      if (key === "company_id") {
        const fullCompanyId = "MA" + formData.company_id.padStart(4, "0");
        payload.append("company_id", fullCompanyId);
      } else if (key !== "confirm_password") {
        payload.append(key, formData[key]);
      }
    }
    payload.append("image", image);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/employees/register/", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Account submitted! Awaiting admin approval. You'll be notified via Gmail.");
      setFormData({
        last_name: "",
        first_name: "",
        middle_name: "",
        suffix: "",
        company_id: "",
        department: "",
        email: "",
        password: "",
        confirm_password: "",
        privacypolicy: false,
        termsofconditions: false,
      });
      setImage(null);
    } catch (error) {
      if (error.response && error.response.data) {
        const data = error.response.data;
        const errors = Object.values(data).flat().join(" ");
        setMessage(`❌ Error: ${errors}`);
      } else {
        setMessage("❌ Something went wrong.");
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Create Account</h2>
        {message && <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>{message}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Middle Name</label>
            <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Suffix</label>
            <select
              name="suffix"
              value={selectedSuffix}
              onChange={(e) => {
                setSelectedSuffix(e.target.value);
                setSuffixError("");
                if (e.target.value !== "Other") {
                  setCustomSuffix("");
                  setFormData((prev) => ({ ...prev, suffix: e.target.value }));
                }
              }}
            >
              {suffixOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt || "-- Select Suffix (optional) --"}
                </option>
              ))}
            </select>
          </div>

          {selectedSuffix === "Other" && (
            <div className="form-group">
              <label>Enter your suffix</label>
              <input
                type="text"
                name="custom_suffix"
                value={customSuffix}
                onChange={(e) => {
                  setCustomSuffix(e.target.value);
                  setFormData((prev) => ({ ...prev, suffix: e.target.value }));
                }}
              />
            </div>
          )}

          {suffixError && <p style={{ color: "red" }}>{suffixError}</p>}
          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
            <label style={{ marginRight: "8px", whiteSpace: "nowrap" }}>Company ID</label>
            <span style={{ marginRight: "4px" }}>MA</span>
            <input
              type="text"
              name="company_id"
              value={formData.company_id}
              onChange={(e) => {
                const numeric = e.target.value.replace(/\D/g, "");
                if (numeric.length <= 4) {
                  setFormData((prev) => ({
                    ...prev,
                    company_id: numeric,
                  }));
                }
              }}
              placeholder="0001"
              required
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select name="department" value={formData.department} onChange={handleChange} required>
              <option value="">-- Select Department --</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="checkbox" name="privacypolicy" checked={formData.privacypolicy} onChange={handleChange} required />
            <label>I agree to the Privacy Policy</label>
          </div>
          <div className="form-group">
            <input type="checkbox" name="termsofconditions" checked={formData.termsofconditions} onChange={handleChange} required />
            <label>I agree to the Terms and Conditions</label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default CreateAccount;
