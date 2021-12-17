import { httpsCallable } from "firebase/functions";
import { useFirebase } from "./FirebaseContext";

const useFirebaseFunction = () => {
    const { firebaseState } = useFirebase();
    const { functions } = firebaseState;

    const call = async (functionName: string, data: any) => {
        if (functions) {
            const callMethod = httpsCallable(functions, functionName);
            return await callMethod(data);
        }
        return null;
    }

    return {
        call
    }
}


export default useFirebaseFunction;