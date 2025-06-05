import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./admin_login.css";
import LoginImage from "/src/frontend/authentication/assets/login/login-image.png"; // Keep your existing image import
import LoginHeader from "../../components/headers/login-header";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAdminLogInPassword, setShowAdminLogInPassword] = useState(false); // ✅ Added this!

    const handleLogin = async (e) => {
      e.preventDefault(); // ✅ Prevent default form refresh
    
      try {
        const response = await fetch("http://localhost:8000/api/token/admin/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
              const error = await response.json();
              
              // Check if it's a validation error from your custom serializer
              if (error.non_field_errors && error.non_field_errors.length > 0) {
                  alert(error.non_field_errors[0]);
              } else {
                  // Fallback to generic message
                  alert("Invalid credentials.");
              }
              return;
          }  
    
        const token = data.access;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userRole = payload.role;
    
        if (userRole === "System Admin" || userRole === "Ticket Agent" || userRole === "Superuser") {
          localStorage.setItem("adminAuthToken", token);
          navigate("/admin/dashboard");
        } else {
          alert("Invalid credentials.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Invalid credentials.");
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
                                autoComplete="new-password"
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
                                {showAdminLogInPassword ? <Eye size={18} /> : <EyeOff size={18} />}
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