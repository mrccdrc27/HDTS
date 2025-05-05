import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../../styles/components/authentication/admin_login.css";
import LoginImage from "/src/frontend/assets/login/login-image.png"; // Keep your existing image import
import LoginHeader from "/src/frontend/components/headers/user_login-header.jsx"; // Import the header component
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [showAdminLogInPassword, setShowAdminLogInPassword] = useState(false); // ✅ Added this!

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
                    <form>
                        <div className="admin-form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                required
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
                            type="button"
                            className="admin-login-button"
                            onClick={() => navigate("/admin/dashboard")}
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
