import CreateAccountForgotPasswordHeader from "../../../components/headers/user_create-account-forgot-password-header";

function ForgotPassword() {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add logic here later to handle password reset
      alert("Password reset link sent!");
    };
  
    return (
      <>
        <CreateAccountForgotPasswordHeader />
  
        <div className="form-container">
          <h2>Forgot Password</h2>
          <hr /> <br /> 
          <p>Enter your email address to receive a password reset link.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <button type="submit" className="btn">
              Send Request Link
            </button>
          </form>
        </div>
      </>
    );
  }
  
  export default ForgotPassword;
  