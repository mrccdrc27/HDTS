import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
    const navigate = useNavigate();

    // ✅ State for form fields and messages
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/admin/login/", {
                email,
                password,
            });

            if (response.data.message === "Login successful") {
                navigate("/admin-dashboard");
            }
        } catch (error) {
            setMessage("Invalid credentials.");
        }
    };

    return (
        <>
            {/* lalagyan ng component dito */}
            <div className="container">
                {/* lalagyan ng logo */}
                <h1>SmartSupport</h1>
                <p>AI-powered Helpdesk and Ticketing System</p>
            </div>

            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* dapat ilalagay to sa form!!! */}
                    <button type="submit" onClick={handleLogin}>Log In</button>
                </form>

                {message && <p style={{ color: "red" }}>{message}</p>}
            </div>
        </>
    );
};

export default AdminLogin;
