import { Button, Space } from "antd";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import iconEmployer from '../../assets/images/icon-employer.svg';
import iconGig from '../../assets/images/icon-gig.svg';

const Register = () => {
    const [selectedAccountType, setSelectedAccountType] = useState('employer');


    return (
        <>
            <h2><FormattedMessage id="AUTH_ACCOUNT_REG" /> (<FormattedMessage id="LABEL_STEP" values={{ 'index': '2', 'total': '3' }} />)</h2>
            <Space direction="vertical" className="account-type-container">
                <div className={selectedAccountType === 'employer' ? 'selected-account' : ''}
                    onClick={() => setSelectedAccountType('employer')}>
                    <div className="account-type-title">
                        <img src={iconEmployer} alt="employer" />
                        <span className="header-2"><FormattedMessage id="LABEL_EMPLOYER" /></span>
                    </div>
                    <ul className="font-body">
                        <li><FormattedMessage id="AUTH_REG_EMP_1" /></li>
                        <li><FormattedMessage id="AUTH_REG_EMP_2" /></li>
                        <li><FormattedMessage id="AUTH_REG_EMP_3" /></li>
                        <li><FormattedMessage id="AUTH_REG_EMP_4" /></li>
                    </ul>
                </div>
                <div className={selectedAccountType === 'gig' ? 'selected-account' : ''}
                    onClick={() => setSelectedAccountType('gig')}>
                    <div className="account-type-title">
                        <img src={iconGig} alt="gig" />
                        <span className="header-2"><FormattedMessage id="LABEL_GIG" /></span>
                    </div>
                    <ul className="font-body">
                        <li><FormattedMessage id="AUTH_REG_GIG_1" /></li>
                        <li><FormattedMessage id="AUTH_REG_GIG_2" /></li>
                        <li><FormattedMessage id="AUTH_REG_GIG_3" /></li>
                        <li><FormattedMessage id="AUTH_REG_GIG_4" /></li>
                    </ul>
                </div>
                <Button type="primary" block htmlType="submit">
                    <FormattedMessage id="GENERAL_NEXT" />
                </Button>
            </Space>
        </>
    )
}

export default Register;