import { Alert, Button, Checkbox, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { useMasterData } from "../../hooks/master-data/MasterDataContext";
import useBusinessNature from "../../hooks/master-data/useBusinessNature";
import CountrySelector from "../../shared/components/CountrySelector";

const RegisterEmployer = () => {
    const intl = useIntl();
    const nav = useNavigate();
    const { getBusinessNatures } = useBusinessNature();
    const { masterDataState } = useMasterData();
    const { businessNatures } = masterDataState;
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getBusinessNatures();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onFinish = async (values: any) => {
        setErrorMessage('');
        const businessNature = businessNatures.find(b => b.value === values.businessNature);
        values = { ...values, businessNature: { id: businessNature.value, name: businessNature.label } };
        console.log(values);
    };

    return (
        <>
            <h2><FormattedMessage id="AUTH_REG_EMP_TITLE" /> (<FormattedMessage id="LABEL_STEP" values={{ 'index': '3', 'total': '3' }} />)</h2>
            {errorMessage && <Alert message={errorMessage} type="error" />}
            <br />
            <Form form={form}
                layout="vertical"
                initialValues={{
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
                    <Input maxLength={255} />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id="LABEL_FULLNAME" />}
                    name="displayName"
                    rules={[
                        { required: true, message: `${intl.formatMessage({ id: 'GENERAL_REQUIRED' })}!` }]}>
                    <Input maxLength={255} />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id="LABEL_COMPANY_NAME" />}
                    name="companyName"
                    rules={[
                        { required: true, message: `${intl.formatMessage({ id: 'GENERAL_REQUIRED' })}!` }]}>
                    <Input maxLength={255} />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id="LABEL_BUSINESS_NATURE" />}
                    name="businessNature"
                    rules={[
                        { required: true, message: `${intl.formatMessage({ id: 'GENERAL_REQUIRED' })}!` }]}>
                    <Select options={businessNatures} placeholder={<FormattedMessage id="LABEL_SELECT_ONE" />} />
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
                        <Button type="primary" block htmlType="submit">
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

export default RegisterEmployer;