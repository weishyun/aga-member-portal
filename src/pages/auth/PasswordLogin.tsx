import { Alert, Button, Form, Input, Space } from "antd";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import useAuthAction from "../../hooks/auth/useAuthAction";

const PasswordLogin = () => {
    const intl = useIntl();
    const nav = useNavigate();
    const { login } = useAuthAction();
    const [errorMessage, setErrorMessage] = useState('');

    const onFinish = async (values: any) => {
        setErrorMessage('');
        const result = await login(values.email, values.password);
        if (!result.success) {
            switch (result.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    setErrorMessage(intl.formatMessage({ id: 'AUTH_VALIDATE_LOGIN' }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <>
            <h2><FormattedMessage id="AUTH_LOGIN_TITLE" /></h2>
            {errorMessage && <Alert message={errorMessage} type="error" />}
            <br />
            <Form className="login-form"
                layout="vertical"
                onFinish={onFinish}>
                <Form.Item
                    label={<FormattedMessage id="LABEL_EMAIL" />}
                    name="email"
                    rules={[
                        { required: true, message: `${intl.formatMessage({ id: 'GENERAL_REQUIRED' })}!` },
                        { type: 'email', message: 'Please enter a valid email.' }]}>
                    <Input maxLength={255} />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id="LABEL_PASSWORD" />}
                    name="password"
                    rules={[
                        { required: true, message: `${intl.formatMessage({ id: 'GENERAL_REQUIRED' })}!` },
                        { min: 8, message: intl.formatMessage({ id: 'AUTH_VALIDATE_PASSWORD' }) },
                        { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#():;"'<>?/~`.,^}{\-_=+]{8,}$/, message: intl.formatMessage({ id: 'AUTH_VALIDATE_PASSWORD_MIXTURE' }) }]}>
                    <Input.Password maxLength={100} />
                </Form.Item>
                <Form.Item>
                    <Space direction="vertical" className="auth-space-full-width">
                        <Button type="primary" block htmlType="submit">
                            <FormattedMessage id="LABEL_LOGIN" />
                        </Button>
                        <Button block htmlType="button" onClick={() => { nav(-1) }}>
                            <FormattedMessage id="LABEL_BACK" />
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}

export default PasswordLogin;