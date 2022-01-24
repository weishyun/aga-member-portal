import React, { createContext, useContext, useReducer } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';
import { Database, getDatabase } from 'firebase/database';
import { Auth, getAuth } from 'firebase/auth';
import { connectFunctionsEmulator, Functions, getFunctions } from 'firebase/functions';
import { mainConfig } from './firebase.config';

interface FirebaseState {
    app: FirebaseApp | null,
    auth: Auth | null,
    db: Database | null,
    store: Firestore | null,
    functions: Functions | null
}

const INITIAL_STATE: FirebaseState = {
    app: null,
    auth: null,
    db: null,
    store: null,
    functions: null
};

export const INITIALIZE_FIREBASE = "[FIREBASE] INITIALIZE_FIREBASE";

const reducer = (state: FirebaseState, action: { type: string, payload: any }): FirebaseState => {
    const { type } = action;
    switch (type) {
        case INITIALIZE_FIREBASE:
            const app = initializeApp(mainConfig);
            const auth = getAuth(app);
            const db = getDatabase(app);
            const store = getFirestore(app);
            //connectFirestoreEmulator(store, 'localhost', 8080);
            const functions = getFunctions(app);
            connectFunctionsEmulator(functions, "localhost", 5001);
            return { ...state, app, auth, db, store, functions }
        default:
            return state;
    }
};

const firebaseContext = createContext<{ firebaseState: FirebaseState; firebaseDispatch: React.Dispatch<any>; }>
    ({ firebaseState: INITIAL_STATE, firebaseDispatch: () => null });

export const FirebaseProvider = ({ children }: any) => {
    const [firebaseState, firebaseDispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <firebaseContext.Provider value={{ firebaseState, firebaseDispatch }} >
            {children}
        </firebaseContext.Provider>
    );
}

export const useFirebase = () => {
    return useContext(firebaseContext);
}