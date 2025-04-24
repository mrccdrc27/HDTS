import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function CreateAccount() {
    const navigate = useNavigate();
    
    return (
        <>
            {/* lalagyan ng component dito */}
            
            <div class="form-container">
                <h2>Create Account</h2>
                <form action="#" method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last_name" required />
                </div>
                <div class="form-group">
                    <label for="first-name">First Name</label>
                    <input type="text" id="first-name" name="first_name" required />
                </div>
                <div class="form-group">
                    <label for="middle-name">Middle Name</label>
                    <input type="text" id="middle-name" name="middle_name" />
                </div>
                <div class="form-group">
                    <label for="suffix">Suffix</label>
                    <input type="text" id="suffix" name="suffix" />
                </div>
                <div class="form-group">
                    <label for="company-id">Company ID</label>
                    <input type="text" id="company-id" name="company_id" required />
                </div>
                <div class="form-group">
                    <label for="department">Department</label>
                    <input type="text" id="department" name="department" required />
                </div>
                <div class="form-group">
                    <label for="image">Upload Image</label>
                    <input type="file" id="image" name="image" accept="image/*" />
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm_password" required />
                </div>
                <div class="form-group">
                    <input type="checkbox" id="privacypolicy" name="privacypolicy" required />
                    <label for="privacypolicy">I agree to the <a href="#">Privacy Policy</a></label>
                </div>
                <div class="form-group">
                    <input type="checkbox" id="termsandconditions" name="termsofconditions" required />
                    <label for="termsandconditions">I agree to the <a href="#">Terms and Conditions</a></label>
                </div>
                </form>

                {/* dapat kasama 'to sa form!! */}
                <div>
                <button onClick={() => navigate("/user/home")}>Sign Up</button>
                </div>
                
                <div class="login-link">
                Already have an account? <Link to="/login/employee">Log In</Link>
                </div>
            </div>

        </>

    )
    }

export default CreateAccount;