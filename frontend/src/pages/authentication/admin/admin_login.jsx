import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* lalagyan ng component dito */}
            <div class="container">
                {/* lalagyan ng logo */}
                <h1>SmartSupport</h1>
                <p>AI-powered Helpdesk and Ticketing System</p>
                </div>

            <div class="login-container">
                <h2>Login</h2>
                <form action="#" method="POST">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                </form>

                {/* dapat ilalagay to sa form!!! */}
                <button onClick={() => navigate("/dashboard")}>Log In</button>
            </div>

        </>

    )
    }

export default AdminLogin;