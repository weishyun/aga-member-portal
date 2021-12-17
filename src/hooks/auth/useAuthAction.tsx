import {
    signInWithEmailAndPassword, User,
    setPersistence, browserSessionPersistence
} from "@firebase/auth";
import { useFirebase } from "../firebase/FirebaseContext";
import { CLEAR_CURRENT_USER, SET_CURRENT_USER, SET_LOGIN_STATUS, SET_SIDE_NAV, useAuth } from "./AuthContext";
import { useLocation, useNavigate } from "react-router";
import useFirebaseDB from "../firebase/useFirebaseDB";

const useAuthAction = () => {
    const { authDispatch } = useAuth();
    const { firebaseState } = useFirebase();
    const { getById } = useFirebaseDB();
    const nav = useNavigate();
    const location = useLocation();

    const checkLogin = () => {
        const { auth } = firebaseState;
        auth?.onAuthStateChanged(async (user: User | null) => {
            if (user) {
                //user is signed in
                const tokenClaim = await user.getIdTokenResult();
                authDispatch({
                    type: SET_CURRENT_USER,
                    payload: {
                        uid: user.uid,
                        displayName: user.displayName,
                        role: tokenClaim.claims.role || ''
                    }
                });
                authDispatch({ type: SET_LOGIN_STATUS, payload: true });
                loadSideNav(tokenClaim.claims.role as string);
                const fromPathname = location?.state?.from?.pathname;
                if (fromPathname) {
                    nav(fromPathname, { replace: true });
                } else {
                    nav('/', { replace: true });
                }
            } else {
                //user is signed out
                authDispatch({ type: CLEAR_CURRENT_USER });
                authDispatch({ type: SET_LOGIN_STATUS, payload: false });
                nav('/login', { replace: true });
            }
        })
    }

    const loadSideNav = async (role: string) => {
        const roleData = await getById(`roles/${role}`);
        authDispatch({ type: SET_SIDE_NAV, payload: roleData.sideNavs });
    }

    const login = async (email: string, password: string) => {
        const { auth } = firebaseState;
        if (!auth) {
            return { success: false };
        }
        await setPersistence(auth, browserSessionPersistence);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error: any) {
            return { success: false, code: error.code, message: error.message };
        }
    }

    const logout = async () => {
        const { auth } = firebaseState;
        await auth?.signOut();
    }

    return {
        checkLogin,
        login,
        logout
    }
}

export default useAuthAction;