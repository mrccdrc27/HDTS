import { useNavigate, Link } from "react-router-dom"; // Combined imports
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import LoginHeader from "/src/frontend/components/headers/user_login-header.jsx";
import LoginImage from "/src/frontend/assets/login/login-image.png";
import "../../../styles/components/authentication/user_login.css";

const UserLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            // Redirect to home page if the form is valid
            navigate("/user/home");
        } else {
            // Optional: Display an alert or error message
            alert("Please fill in both fields.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="login-wrapper">
            {/* Left side - Image */}
            <div className="login-image-wrapper">
                <img src={LoginImage} alt="Login" className="login-image" />
            </div>
            
            {/* Right side - Login form */}
            <div className="login-right-side">
                <LoginHeader />
                
                <div className="login-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="forgot-password">
                                <Link to="/forgot-password">Forgot password?</Link>
                            </div>
                        </div>
                        
                        <button type="submit" className="login-button">
                            Log In
                        </button>
                    </form>
                    
                    <div className="create-account">
                        <p>Don't have an account? <Link to="/create-account">Create Account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
