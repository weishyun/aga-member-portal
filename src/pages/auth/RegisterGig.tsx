import { Alert, Button, Checkbox, Form, Input, Space } from "antd";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/AuthContext";
import useAuthAction from "../../hooks/auth/useAuthAction";
import useBasicProfile from "../../hooks/profile/useBasicProfile";
import CountrySelector from "../../shared/components/CountrySelector";

const RegisterGig = () => {
    const intl = useIntl();
    const nav = useNavigate();
    const { authState } = useAuth();
    const { refreshUser } = useAuthAction();
    const [errorMessage, setErrorMessage] = useState('');
    const { createGigWorkerBasicProfile } = useBasicProfile();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: any) => {
        setErrorMessage('');
        setLoading(true);
        await createGigWorkerBasicProfile(values);
        setLoading(false);
        refreshUser();
    };

    return (
        <>
            <h2><FormattedMessage id="AUTH_REG_GIG_TITLE" /> (<FormattedMessage id="LABEL_STEP" values={{ 'index': '3', 'total': '3' }} />)</h2>
            {errorMessage && <Alert message={errorMessage} type="error" />}
            <br />
            <Form
                layout="vertical"
                initialValues={{
                    email: authState.email,
                    country: {
                        dialCode: "+60",
                        flag: "https://cdn.kcak11.com/CountryFlags/countries/my.svg",
                        isoCode: "MY",
                        name: "Malaysia"
                    }
                }}
                onFinish={onFinish}>
                <Form.Item
                    label={<FormattedMessage id="LABEL_EMAIL" />}
                    name="email"
                    rules={[
                        { required: true, message: `${intl.formatMessage({ id: 'GENERAL_REQUIRED' })}!` },
                        { type: 'email', message: 'Please enter a valid email.' }]}>
                    <Input maxLength={255} disabled={authState.provider === 'password'} />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id="LABEL_FIRSTNAME" />}
                    name="firstName"
                    rules={[
                        { required: true, message: `${intl.formatMessage({ id: 'GENERAL_REQUIRED' })}!` }]}>
                    <Input maxLength={255} />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id="LABEL_LASTNAME" />}
                    name="lastName"
                    rules={[
                        { required: true, message: `${intl.formatMessage({ id: 'GENERAL_REQUIRED' })}!` }]}>
                    <Input maxLength={255} />
                </Form.Item>
                <Form.Item name="country"
                    label={<FormattedMessage id="LABEL_COUNTRY" />}>
                    <CountrySelector />
                </Form.Item>
                <Form.Item name="subscribe" valuePropName="checked">
                    <Checkbox>
                        <FormattedMessage id="AUTH_SUBSCRIPTION" />
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <FormattedMessage id="AUTH_AGREE_TERM"
                        values={{
                            term: <Link to="/term-of-use"><FormattedMessage id="LABEL_TERM" /></Link>,
                            privacy: <Link to="/privacy-policy"><FormattedMessage id="LABEL_PRIVACY" /></Link>
                        }} />
                </Form.Item>
                <Form.Item>
                    <Space direction="vertical" className="auth-space-full-width">
                        <Button type="primary" block htmlType="submit" loading={loading}>
                            <FormattedMessage id="LABEL_REGISTER" />
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

export default RegisterGig;