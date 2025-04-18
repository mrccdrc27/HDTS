import { useNavigate } from "react-router-dom";

function LogInPortal() {
    const navigate = useNavigate();

    return (
        <>
            <div>
                {/* lalagyan dito for logo */}
                <h1>SmartSupport</h1>
                <p>AI-powered Helpdesk Ticketing System</p>
            </div>

            <div>
                <button>Image</button>{/* Lalagay dito 'yung image */}
            </div>

            <div>
                <h1>Smart Ticketing</h1>
                <h2>for Better Support</h2>
                <p>"From submission to resolution, we've got your workflow covered!"</p>
            </div>

            <div>
                <button onClick={() => navigate("/user-login")}>Employee</button>
                <button onClick={() => navigate("/admin-login")}>Admin</button>
            </div>
        </>
    )
    }

export default LogInPortal;