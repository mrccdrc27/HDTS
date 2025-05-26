import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../../../styles/components/authentication/user_login.css";
import LoginImage from "/src/frontend/assets/login/login-image.png";
import LoginHeader from "/src/frontend/components/headers/user_login-header.jsx";
import { Eye, EyeOff } from "lucide-react";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  process.env.VITE_API_BASE_URL ||
  "https://group5capstone1-production.up.railway.app";

const UserLogin = () => {
    const navigate = useNavigate();
    const [showLogInPassword, setShowLogInPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Better fallback handling for the base URL
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || 
                         process.env.VITE_API_BASE_URL || 
                         "https://group5capstone1-production.up.railway.app";

        console.log("🔐 Login attempt with BASE_URL:", BASE_URL);

        try {
            const response = await fetch(`${BASE_URL}/api/token/employee/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });         
        
            console.log("🔍 Login response status:", response.status);

            if (!response.ok) {
                const error = await response.json();
                console.error("❌ Login error:", error);
                setError(error.detail || "Login failed. Please check your credentials.");
                return;
            }
        
            const data = await response.json();
            console.log("✅ Login successful");
            
            // Store tokens in localStorage (this will work in production)
            localStorage.setItem("authToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
        
            const profileResponse = await fetch(`${BASE_URL}/api/employee/profile/`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${data.access}`,
                },
              });              
              
              if (profileResponse.ok) {
                const profile = await profileResponse.json();
                localStorage.setItem("firstName", profile.first_name);
                localStorage.setItem("lastName", profile.last_name);
              } else {
                console.warn("Failed to fetch profile");
              }

            // Redirect to home page
            navigate("/user/home");

        } catch (error) {
            console.error("🚨 Login network error:", error);
            setError("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

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
                    <form onSubmit={handleLogin}>
                        {/* Error message display */}
                        {error && (
                            <div className="error-message" style={{ 
                                color: '#dc3545', 
                                marginBottom: '1rem', 
                                padding: '0.5rem',
                                backgroundColor: '#f8d7da',
                                border: '1px solid #f5c6cb',
                                borderRadius: '4px'
                            }}>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showLogInPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
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
                                    style={{ 
                                        cursor: isLoading ? 'default' : 'pointer',
                                        opacity: isLoading ? 0.5 : 1
                                    }}
                                >
                                    {showLogInPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                            <div className="forgot-password">
                                <Link to="/forgot-password">Forgot password?</Link>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="login-button"
                            disabled={isLoading}
                            style={{
                                opacity: isLoading ? 0.7 : 1,
                                cursor: isLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isLoading ? "Logging in..." : "Log In"}
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