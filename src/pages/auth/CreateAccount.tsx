import { Button, Form, Input, Space } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import useAuthAction from "../../hooks/auth/useAuthAction";

const CreateAccount = () => {
    const intl = useIntl();
    const nav = useNavigate();
    const { createPasswordAccount } = useAuthAction();

    const onFinish = async (values: any) => {
        createPasswordAccount(values.email, values.password);
    };

    return (<>
        <h2><FormattedMessage id="AUTH_CREATE_AGA_ACCOUNT" /></h2>
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
            <Form.Item label={<FormattedMessage id="LABEL_CONFIRM_PASSWORD" />}
                name="confirm" dependencies={['password']}
                rules={[
                    { required: true, message: `${intl.formatMessage({ id: 'GENERAL_REQUIRED' })}!` },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(intl.formatMessage({ id: 'AUTH_VALIDATE_CONFIRM' })));
                        },
                    }),
                ]}>
                <Input.Password maxLength={100} />
            </Form.Item>
            <Form.Item>
                <Space direction="vertical" className="auth-space-full-width">
                    <Button type="primary" block htmlType="submit">
                        <FormattedMessage id="GENERAL_NEXT" />
                    </Button>
                    <Button block htmlType="button" onClick={() => { nav(-1) }}>
                        <FormattedMessage id="LABEL_BACK" />
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    </>)
}

export default CreateAccount;