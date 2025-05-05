import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../../../styles/components/authentication/user_login.css";
import LoginImage from "/src/frontend/assets/login/login-image.png"; // Keep your existing image import
import LoginHeader from "/src/frontend/components/headers/user_login-header.jsx"; // Import the header component
import { Eye, EyeOff } from "lucide-react";

const UserLogin = () => {
    const navigate = useNavigate();
    const [showLogInPassword, setShowLogInPassword] = useState(false);

    return (
        <div className="login-wrapper">
            {/* Left side - Image */}
            <div className="login-image-wrapper">
                <img src={LoginImage} alt="Login" className="login-image" />
            </div>
            
            {/* Right side - Login form */}
            <div className="login-right-side">
                {/* Header component outside the login container */}
                <LoginHeader />                  
                
                <div className="login-container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Email address"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type={showLogInPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                            <span
                                className="login-password-icon"
                                data-tooltip={showLogInPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowLogInPassword(!showLogInPassword)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") setShowLogInPassword(!showLogInPassword);
                                }}
                            >
                                {showLogInPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                                <div className="forgot-password">
                                    <Link to="/forgot-password">Forgot password?</Link>
                                </div>
                        </div>

                        <button type="submit" className="login-button" onClick={() => navigate("/user/home")}>
                            Log In
                        </button>
                    </form>
                    
                    <div className="create-account">
                        <span>Don't have any account? </span>
                        <Link to="/create-account" className="create-account-link">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;