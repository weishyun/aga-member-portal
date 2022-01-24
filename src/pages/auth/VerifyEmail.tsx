import { Alert, Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/auth/AuthContext";
import useAuthAction from "../../hooks/auth/useAuthAction";
import useVerifyLink from "../../hooks/auth/useVerifyLink";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const { activateEmail } = useVerifyLink();
    const { authState } = useAuth();
    const { refreshUser } = useAuthAction();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const intl = useIntl();
    const nav = useNavigate();

    useEffect(() => {
        const uid = searchParams.get('i');
        const code = searchParams.get('c');
        const verifyEmail = async () => {
            try {
                if (uid && code) {
                    const result: any = await activateEmail(uid, code);
                    console.log('verify result:', result)
                    if (!result?.data?.success) {
                        setErrorMessage(intl.formatMessage({ id: 'AUTH_INVALID_EMAIL_LINK' }));
                    } else {
                        setSuccessMessage(intl.formatMessage({ id: 'AUTH_VERIFY_EMAIL_SUCCESS' }));
                        refreshUser(false);
                    }
                } else {
                    setErrorMessage(intl.formatMessage({ id: 'AUTH_INVALID_EMAIL_LINK' }));
                }
            } catch (error) {
                console.error(error);
                setErrorMessage(intl.formatMessage({ id: 'AUTH_INVALID_EMAIL_LINK' }));
            }
        }
        verifyEmail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h2><FormattedMessage id="AUTH_VERIFY_EMAIL_TITLE" /></h2>
            <Spin spinning={!errorMessage && !successMessage}>
                {errorMessage && <Alert message={errorMessage}
                    action={
                        <Button size="small" type="ghost"
                            onClick={
                                () => { nav('/auth', { replace: true }) }
                            }>
                            <FormattedMessage id="GENERAL_NEXT" />
                        </Button>
                    }
                    type="error" />}
                {successMessage &&
                    <Alert message={successMessage}
                        action={
                            <Button size="small" type="ghost"
                                onClick={
                                    () => { nav(authState.isLogin ? '/' : '/auth', { replace: true }) }
                                }>
                                <FormattedMessage id="GENERAL_NEXT" />
                            </Button>
                        }
                        type="success" />}
            </Spin>
        </>
    )
}

export default VerifyEmail;