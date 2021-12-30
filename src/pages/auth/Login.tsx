
import { useState } from "react";
import useAuthAction from "../../hooks/auth/useAuthAction";
import useSpinner from "../../hooks/layout/useSpinner";
import iconEmail from '../../assets/images/icon-email.svg';
import iconGoogle from '../../assets/images/icon-google.svg';
import iconMicrosoft from '../../assets/images/icon-microsoft.svg';
import iconFacebook from '../../assets/images/icon-facebook.svg';
import iconGithub from '../../assets/images/icon-github.svg';
import logo from '../../assets/images/logo-with-name.svg';
import { FormattedMessage } from "react-intl";
import { Button, Space } from "antd";
import { Provider } from "../../hooks/auth/provider.enum";
import { Link } from "react-router-dom";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { loginWithSocial } = useAuthAction();
    const { setLoading } = useSpinner();

    return (
        <>
            <img src={logo} alt="Ace Gig Alert" />
            <h2><FormattedMessage id="AUTH_LOGIN_TITLE" /></h2>
            <Space direction="vertical" size="middle" className="auth-button-group">
                <Button icon={<img src={iconGoogle} alt="Google" />} block size="large"
                    onClick={() => loginWithSocial(Provider.Google)}>
                    <FormattedMessage id="AUTH_GOOGLE_LOGIN" />
                </Button>
                <Button icon={<img src={iconMicrosoft} alt="Microsoft" />} block size="large"
                    onClick={() => loginWithSocial(Provider.Microsoft)}>
                    <FormattedMessage id="AUTH_MICROSOFT_LOGIN" />
                </Button>
                <Button icon={<img src={iconFacebook} alt="Facebook" />} block size="large"
                    onClick={() => loginWithSocial(Provider.Facebook)}>
                    <FormattedMessage id="AUTH_FACEBOOK_LOGIN" />
                </Button>
                <Button icon={<img src={iconGithub} alt="GitHub" />} block size="large"
                    onClick={() => loginWithSocial(Provider.GitHub)}>
                    <FormattedMessage id="AUTH_GITHUB_LOGIN" />
                </Button>
                <Link to="/auth/password-login">
                    <Button icon={<img src={iconEmail} alt="Email" />} block size="large">
                        <FormattedMessage id="AUTH_EMAIL_LOGIN" />
                    </Button>
                </Link>
                <div>
                    <FormattedMessage id="AUTH_NO_ACCOUNT" />
                    <Link to="/auth/create-account">
                        <Button type="link">
                            <FormattedMessage id="AUTH_CREATE_ACCOUNT" />
                        </Button>
                    </Link>
                </div>
            </Space>
        </>
    )
}

export default Login;