import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "../../../styles/components/authentication/user_login.css";
import LoginImage from "/src/frontend/assets/login/login-image.png";
import LoginHeader from "/src/frontend/components/headers/user_login-header.jsx";
import { Eye, EyeOff } from "lucide-react";

const UserLogin = () => {
    const navigate = useNavigate();
    const [showLogInPassword, setShowLogInPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:8000/api/token/employee/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
      
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
      
          const data = await response.json();
          localStorage.setItem("authToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
      
          // ✅ Fetch employee profile
          const profileResponse = await fetch("http://localhost:8000/api/employee/profile/", {
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
      
          navigate("/user/home");
        } catch (error) {
          console.error("Login error:", error);
          alert("Something went wrong. Please try again.");
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
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
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

                        <button type="submit" className="login-button">
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