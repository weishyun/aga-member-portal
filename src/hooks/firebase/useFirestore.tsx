import { useFirebase } from "./FirebaseContext";
import {
    addDoc, collection, deleteDoc, doc,
    serverTimestamp, updateDoc, getDoc, setDoc,
    QueryConstraint,
    query,
    limit,
    getDocs
} from "firebase/firestore";

const useFirestore = () => {
    const { firebaseState } = useFirebase();
    const { store } = firebaseState;

    const getAll = async (collName: string, queryConstraint: QueryConstraint[], size: number = 15) => {
        if (store) {
            try {
                const collRef = collection(store, collName);
                const q = query(collRef, ...queryConstraint, limit(size));
                const querySnapshot = await getDocs(q);
                const data: any[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ key: doc.id, id: doc.id, ...doc.data() })
                });
                return data;
            } catch (error) {
                console.error('Faled to get all:', error);
            }
        }
    }

    const getById = async (collName: string, docId: string) => {
        if (store) {
            try {
                const dataSnapshot = await getDoc(doc(store, collName, docId));
                return dataSnapshot.exists() ? dataSnapshot.data() : {};
            } catch (error) {
                console.error('Failed to get by Id:', error);
            }
        }
    }

    const create = async (collName: string, data: any) => {
        if (store) {
            try {
                const docRef = await addDoc(
                    collection(store, collName),
                    { ...data, createdAt: serverTimestamp() });
                return docRef.id;
            } catch (error) {
                console.error('Failed to create data:', error);
            }
        }
    }

    const replace = async (collName: string, docId: string, data: any) => {
        if (store) {
            try {
                await setDoc(
                    doc(store, collName, docId), {
                    ...data, updatedAt: serverTimestamp()
                });
            } catch (error) {
                console.error('Failed to replace data:', error);
            }
        }
    }

    const modify = async (collName: string, docId: string, data: any) => {
        if (store) {
            try {
                await updateDoc(doc(store, collName, docId), {
                    ...data, updatedAt: serverTimestamp()
                });
            } catch (error) {
                console.error('Failed to modify data:', error);
            }
        }
    }

    const rem = async (collName: string, docId: string) => {
        if (store) {
            try {
                await deleteDoc(doc(store, collName, docId));
            } catch (error) {
                console.error('Failed to delete data:', error);
            }
        }
    }

    return {
        getAll,
        getById,
        create,
        replace,
        modify,
        rem
    }
}

export default useFirestore;