import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../../assets/smartsupport-logo.svg";

const UserLogin = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="container">
                <img src={Logo} alt="Smart Support Logo" className="userNavbar-logo" />
                <h1>SmartSupport</h1>
                <p>AI-powered Helpdesk and Ticketing System</p>
            </div>

            <div className="login-container">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                </form>    
                <div className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <button onClick={() => navigate("/user/home")}>Log In</button>   
                

                <div className="create-account">
                    <p>Don't have an account? <Link to="/create-account">Create Account</Link></p>
                </div>
            </div>
        </>
    );
};

export default UserLogin;
