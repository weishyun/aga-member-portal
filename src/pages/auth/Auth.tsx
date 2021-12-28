import { FormattedMessage } from "react-intl";
import { Outlet } from "react-router-dom";
import backgroundWithLogo from '../../assets/images/background-with-logo.svg';
import "./Auth.less";

const Auth = () => {
    return (
        <div className="auth-fullpage-container">
            <img className="background-with-logo" src={backgroundWithLogo} alt="Ace Gig Alert" />
            <div className="auth-zone">
                <div className="auth-inner-container">
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