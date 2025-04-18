function ForgotPassword() {
    return (
        <>
            {/* lalagyan ng component dito */}
            
            <div class="form-container">
                <h2>Forgot Password</h2>
                <p>Enter your email address to receive a password reset link.</p>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <button type="submit" class="btn">Send Request Link</button>
            </div>

        </>

    )
    }

export default ForgotPassword;