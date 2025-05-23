
    import Logo from '/src/frontend/assets/smartsupport-logo.svg';
    import './login-header.css'

    const LoginHeader = () => {
        return (
            <div className="login-header">
                <div className="login-header-brand">
                    <img src={Logo} alt="Smart Support Logo" className="login-header-logo" />
                    <div>
                        <h2 className="login-header-title">Smart<span>Support</span></h2>
                        <p className="login-header-subtitle">AI-powered Helpdesk Ticketing System</p>
                    </div>
                </div>
            </div>
        );
    }

    export default LoginHeader;
