import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../../assets/smartsupport-logo.svg";
import { useState } from "react";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // Skip validation and go straight to the ticket admin page
        const mockAdmin = {
            name: "Test Admin",
            email,
            role: "ticket-admin"
        };

        localStorage.setItem("currentUser", JSON.stringify(mockAdmin));
        navigate("/admin/dashboard");
    };

    return (
        <>
            <div className="container">
                <img src={Logo} alt="Smart Support Logo" className="userNavbar-logo" />
                <h1>SmartSupport</h1>
                <p>AI-powered Helpdesk and Ticketing System</p>
            </div>

            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit">Log In</button>
                </form>
            </div>
        </>
    );
};

export default AdminLogin;
