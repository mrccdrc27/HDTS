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
      const response = await fetch("http://localhost:8000/api/token/admin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.non_field_errors && data.non_field_errors.length > 0) {
          alert(data.non_field_errors[0]);
        } else {
          alert("Invalid credentials.");
        }
        return;
      }

      const token = data.access;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userRole = payload.role;

      console.log("Decoded JWT payload:", payload);

      const allowedRoles = ["System Admin", "Ticket Coordinator", "Superuser"];
      if (allowedRoles.includes(userRole)) {
        localStorage.setItem("adminAuthToken", token);
        console.log("Login success. Redirecting...");
        navigate("/admin/dashboard");
      } else {
        console.warn("Rejected role:", userRole);
        alert("Access denied: Not an admin account.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login.");
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
