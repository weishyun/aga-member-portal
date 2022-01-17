import React, { createContext, useContext, useReducer } from "react";

interface MasterDataState {
    businessNatures: any[];
    countries: any[];
}

const INITIAL_STATE: MasterDataState = {
    businessNatures: [],
    countries: []
};

export const SET_BUSINESS_NATURES = "[MASTER] SET_BUSINESS_NATURES";
export const SET_COUNTRIES = "[MASTER] SET_COUNTRIES";

const reducer = (state: MasterDataState, action: { type: string, payload: any }): MasterDataState => {
    const { type, payload } = action;
    switch (type) {
        case SET_BUSINESS_NATURES:
            return {
                ...state,
                businessNatures: [...payload]
            }
        case SET_COUNTRIES:
            return {
                ...state,
                countries: [...payload]
            }
        default:
            return state;
    }
};

const masterDataContext = createContext<{ masterDataState: MasterDataState; masterDataDispatch: React.Dispatch<any>; }>
    ({ masterDataState: INITIAL_STATE, masterDataDispatch: () => null });

export const MasterDataProvider = ({ children }: any) => {
    const [masterDataState, masterDataDispatch] = useReducer(reducer, INITIAL_STATE);
    return (
        <masterDataContext.Provider value={{ masterDataState, masterDataDispatch }} >
            {children}
        </masterDataContext.Provider>
    );
}

export const useMasterData = () => {
    return useContext(masterDataContext);
}