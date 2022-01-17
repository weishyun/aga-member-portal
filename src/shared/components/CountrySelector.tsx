import { Select } from "antd"
import { useEffect } from "react";
import { useMasterData } from "../../hooks/master-data/MasterDataContext";
import './CountrySelector.less';
import useCountry from "../../hooks/master-data/useCountry";
import { FormattedMessage } from "react-intl";
const { Option } = Select;

interface Props {
    value?: any;
    onChange?: (selectedValue: any) => void;
}

const CountrySelector = ({ value = {}, onChange }: Props) => {
    const { getCountries } = useCountry();
    const { masterDataState } = useMasterData();
    const { countries } = masterDataState;

    useEffect(() => {
        getCountries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     if (!value.isoCode) {
    //         const defaultSelected: any = countries.find(c => c.isoCode === 'MY');
    //         onChange?.(defaultSelected);
    //     }// eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [countries]);

    const handleChange = (selectedValue: string) => {
        const value: any = countries.find(c => c.isoCode === selectedValue);
        onChange?.(value);
    }
    console.log(value)
    return (
        <Select onChange={handleChange}
            placeholder={<FormattedMessage id="LABEL_SELECT_ONE" />}
            showSearch value={value.isoCode || 'MY'}
            filterOption={(input, option) => {
                if (option && option.label) {
                    return option.label.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                return false;
            }}>
            {
                countries.map(c =>
                    <Option key={c.isoCode} value={c.isoCode} label={c.name}>
                        <div className="country-select-item">
                            <img src={c.flag} alt={c.name} />
                            <span>{c.name}</span>
                        </div>
                    </Option>
                )
            }
        </Select >
    )
}

export default CountrySelector;