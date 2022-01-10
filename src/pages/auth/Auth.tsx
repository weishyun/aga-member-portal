import { FormattedMessage } from "react-intl";
import { Outlet } from "react-router-dom";
import backgroundWithLogo from '../../assets/images/background-with-logo.svg';
import logo from '../../assets/images/logo-with-name.svg';
import "./Auth.less";

const Auth = () => {
    return (
        <div className="auth-fullpage-container">
            <img className="background-with-logo" src={backgroundWithLogo} alt="Ace Gig Alert" />
            <div className="auth-zone">
                <div className="auth-inner-container">
                <img src={logo} alt="Ace Gig Alert" />
            
                    <Outlet />
                </div>
                <h5>
                    <FormattedMessage id="COPY_RIGHT" />
                </h5>
            </div>
        </div>
    )
}

export default Auth;