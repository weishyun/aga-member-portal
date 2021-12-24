import React, { createContext, useContext, useReducer } from "react";

interface SideNav {
    id: string,
    accessLevel: string
}

interface AuthState {
    isLogin: boolean;
    uid: string | null;
    displayName: string | null;
    role: string | null,
    sideNav: SideNav[]
}

const INITIAL_STATE: AuthState = {
    isLogin: false,
    uid: null,
    displayName: null,
    role: null,
    sideNav: []
};

export const SET_LOGIN_STATUS = "[AUTH] SET_LOGIN_STATUS";
export const SET_LOGIN_ERROR = "[AUTH] SET_LOGIN_ERROR";
export const SET_CURRENT_USER = "[AUTH] SET_CURRENT_USER";
export const CLEAR_CURRENT_USER = "[AUTH] CLEAR_CURRENT_USER";
export const SET_SIDE_NAV = "[AUTH] SET_SIDE_NAV";

const reducer = (state: AuthState, action: { type: string, payload: any }): AuthState => {
    const { type, payload } = action;
    switch (type) {
        case SET_CURRENT_USER:
            const { role, uid, displayName } = payload;
            return {
                ...state,
                uid,
                displayName,
                role
            }
        case SET_LOGIN_STATUS:
            return { ...state, isLogin: payload };
        case CLEAR_CURRENT_USER:
            return INITIAL_STATE;
        case SET_SIDE_NAV:
            return { ...state, sideNav: payload ? [...payload] : [] };
        default:
            return state;
    }
};

const authContext = createContext<{ authState: AuthState; authDispatch: React.Dispatch<any>; }>
    ({ authState: INITIAL_STATE, authDispatch: () => null });

export const AuthProvider = ({ children }: any) => {
    const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
    return (
        <authContext.Provider value={{ authState, authDispatch }} >
            {children}
        </authContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(authContext);
}