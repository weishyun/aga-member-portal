import { Alert, Button, Form, Input } from "antd";
import { LoginOutlined } from '@ant-design/icons';
import "./Auth.less";
import { useState } from "react";
import useAuthAction from "../../hooks/auth/useAuthAction";
import useSpinner from "../../hooks/layout/useSpinner";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuthAction();
    const { setLoading } = useSpinner();

    const onFinish = async (values: any) => {
        setErrorMessage('');
        setLoading(true);
        const result = await login(values.email, values.password);
        setLoading(false);
        if (!result.success) {
            switch (result.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    setErrorMessage('Invalid email or password!')
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div className="auth-fullpage-container">
            <div className="app-form-small-container">
                <div className="header-band">
                    {/* <div className="product-logo"><img src={logo} alt="logo" /></div>
                    <Divider type="vertical" className="login-title-divider" /> */}
                    <h2 className="header-2">Ace Gig Alert</h2>
                </div>
                {errorMessage && <Alert message={errorMessage} type="error" />}
                <Form className="login-form"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email.' }]}>
                        <Input placeholder="Email" maxLength={255} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 8, message: "Password must be at least 8 characters alphanumeric password" },
                            {
                                pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#():;"'<>?/~`.,^}{\-_=+])[A-Za-z\d@$!%*?&#():;"'<>?/~`.,^}{\-_=+]{8,}/,
                                message: "Password must be alphanumeric with at least one special character, lowercase and uppercase."
                            }]}
                    >
                        <Input.Password placeholder="Password" maxLength={100} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            <LoginOutlined />Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login;