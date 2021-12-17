import React, { createContext, useContext, useReducer } from "react";

interface LayoutState {
    locale: string;
    showLoading: boolean;
    showViewDrawer: boolean;
    showEditDrawer: boolean;
    showCreateDrawer: boolean;
}

const INITIAL_STATE: LayoutState = {
    locale: 'en',
    showLoading: false,
    showViewDrawer: false,
    showEditDrawer: false,
    showCreateDrawer: false
};

export const SET_LANGUAGE = "[LAYOUT] SET_LANGUAGE";
export const SHOW_LOADING = '[LAYOUT] SHOW_LOADING';
export const SHOW_VIEW_DRAWER = '[LAYOUT] SHOW_VIEW_DRAWER';
export const SHOW_EDIT_DRAWER = '[LAYOUT] SHOW_EDIT_DRAWER';
export const SHOW_CREATE_DRAWER = '[LAYOUT] SHOW_CREATE_DRAWER';

const reducer = (state: LayoutState, action: { type: string, payload: any }): LayoutState => {
    const { type, payload } = action;
    switch (type) {
        case SET_LANGUAGE:
            return { ...state, locale: payload };
        case SHOW_LOADING:
            return { ...state, showLoading: payload };
        case SHOW_VIEW_DRAWER:
            return { ...state, showViewDrawer: payload };
        case SHOW_EDIT_DRAWER:
            return { ...state, showEditDrawer: payload };
        case SHOW_CREATE_DRAWER:
            return { ...state, showCreateDrawer: payload };
        default:
            return state;
    }
};


const layoutContext = createContext<{ layoutState: LayoutState; layoutDispatch: React.Dispatch<any>; }>
    ({ layoutState: INITIAL_STATE, layoutDispatch: () => null });

export const LayoutProvider = ({ children }: any) => {
    const [layoutState, layoutDispatch] = useReducer(reducer, INITIAL_STATE);
    return (
        <layoutContext.Provider value={{ layoutState, layoutDispatch }} >
            {children}
        </layoutContext.Provider>
    );
}

export const useLayout = () => {
    return useContext(layoutContext);
}
