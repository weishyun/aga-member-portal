import { FormattedMessage } from "react-intl";

const RegisterGig = () => {
    return (
        <>
            <h2><FormattedMessage id="AUTH_REG_GIG_TITLE" /> (<FormattedMessage id="LABEL_STEP" values={{ 'index': '3', 'total': '3' }} />)</h2>

        </>
    )
}

export default RegisterGig;