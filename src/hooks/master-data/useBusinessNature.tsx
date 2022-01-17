import useFirebaseDB from "../firebase/useFirebaseDB";
import { SET_BUSINESS_NATURES, useMasterData } from "./MasterDataContext";

const useBusinessNature = () => {
    const { getAll } = useFirebaseDB();
    const { masterDataState, masterDataDispatch } = useMasterData();

    const getBusinessNatures = async () => {
        if (masterDataState.businessNatures.length === 0) {
            let data = await getAll('business-natures');
            data = data?.map(d => { return { label: d.name, value: d.id } });
            masterDataDispatch({ type: SET_BUSINESS_NATURES, payload: data || [] });
        }
    }

    return {
        getBusinessNatures
    }
}

export default useBusinessNature;