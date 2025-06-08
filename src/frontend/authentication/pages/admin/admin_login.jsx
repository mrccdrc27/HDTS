import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./admin_login.css";
import LoginImage from "/src/frontend/authentication/assets/login/login-image.png";
import LoginHeader from "../../components/headers/login-header";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAdminLogInPassword, setShowAdminLogInPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Clear any previous tokens
      localStorage.removeItem("adminAuthToken");
      localStorage.removeItem("adminRefreshToken");

      const response = await fetch("http://localhost:8000/api/token/admin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.non_field_errors?.[0] || 
                          data.detail || 
                          "Invalid credentials";
        throw new Error(errorMessage);
      }

      const { access, refresh } = data;
      
      // Decode JWT token safely
      let payload;
      try {
        payload = JSON.parse(atob(access.split('.')[1]));
      } catch (decodeError) {
        console.error("Token decode error:", decodeError);
        throw new Error("Invalid token format");
      }

      const userRole = payload.role;
      console.log("Authenticated as:", payload);

      // Role validation
      const ADMIN_ROLES = [
        "System Admin", 
        "Ticket Coordinator", 
        "Superuser"
      ];

      if (!ADMIN_ROLES.includes(userRole)) {
        throw new Error(`Access denied: ${userRole} role not authorized`);
      }

      // Store tokens securely
      localStorage.setItem("adminAuthToken", access);
      localStorage.setItem("adminRefreshToken", refresh);

      // Redirect with state for additional security
      navigate("/admin/dashboard", {
        replace: true,
        state: { freshLogin: true }
      });

    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="admin-login-wrapper">
      {/* Left side - Image */}
      <div className="admin-login-image-wrapper">
        <img src={LoginImage} alt="Login" className="login-image" />
      </div>

      {/* Right side - Login form */}
      <div className="admin-login-right-side">
        <LoginHeader />

        <div className="admin-login-container">
          <form onSubmit={handleLogin}>
            <div className="admin-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password">Password</label>
              <input
                type={showAdminLogInPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <span
                className="admin-login-password-icon"
                data-tooltip={showAdminLogInPassword ? "Hide password" : "Show password"}
                onClick={() => setShowAdminLogInPassword(!showAdminLogInPassword)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setShowAdminLogInPassword(!showAdminLogInPassword);
                }}
              >
                {showAdminLogInPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>

            <button type="submit" className="admin-login-button">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
