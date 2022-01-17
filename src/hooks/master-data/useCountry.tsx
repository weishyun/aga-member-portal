import { SET_COUNTRIES, useMasterData } from "./MasterDataContext";
import countries from '../../assets/data/countries.json';

const useCountry = () => {
    const { masterDataState, masterDataDispatch } = useMasterData();

    const getCountries = async () => {
        if (masterDataState.countries.length === 0) {
            masterDataDispatch({ type: SET_COUNTRIES, payload: countries || [] });
        }
    }

    return {
        getCountries
    }
}

export default useCountry;