import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../../styles/components/authentication/admin_login.css";
import LoginImage from "/src/frontend/assets/login/login-image.png"; // Keep your existing image import
import LoginHeader from "/src/frontend/components/headers/user_login-header.jsx"; // Import the header component
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAdminLogInPassword, setShowAdminLogInPassword] = useState(false); // ✅ Added this!

    const handleLogin = async () => {
        try {
          const response = await fetch("https://group5capstone1-production.up.railway.app/api/token/admin/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            alert(data.detail || "Invalid credentials.");
            return;
          }
    
          const token = data.access;
          const payload = JSON.parse(atob(token.split('.')[1]));
          const userRole = payload.role;
    
          if (userRole === "System Admin" || userRole === "Ticket Agent" || userRole === "Superuser") {
            localStorage.setItem("token", token);
            navigate("/admin/dashboard");
          } else {
            alert("Access denied. Only admins and ticket agents can log in here.");
          }          
    
        } catch (error) {
          console.error("Login error:", error);
          alert("Something went wrong. Try again.");
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
                {/* Header component outside the login container */}
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
                            />
                            <span
                                className="admin-login-password-icon"
                                data-tooltip={showAdminLogInPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowAdminLogInPassword(!showAdminLogInPassword)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") setShowAdminLogInPassword(!showAdminLogInPassword);
                                }}
                            >
                                {showAdminLogInPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                        {/* ✅ Changed type to button (if you don't want a form submission refresh) */}
                        <button
                            
                            className="admin-login-button"
                            
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
