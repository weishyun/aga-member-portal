import { ref, get, push, update, remove, serverTimestamp } from "@firebase/database";
import { useFirebase } from "../firebase/FirebaseContext";

const useFirebaseDB = () => {
    const { firebaseState } = useFirebase();
    const { db } = firebaseState;

    const getAll = async (path: string) => {
        if (db) {
            const dataRef = ref(db, path);
            try {
                const dataSnapshot = await get(dataRef);
                const data: any[] = [];
                if (dataSnapshot.exists()) {
                    dataSnapshot.forEach((snapshot) => {
                        data.push({
                            key: snapshot.key,
                            id: snapshot.key,
                            ...snapshot.val()
                        });
                    });
                }
                return data;
            } catch (error) {
                console.error(`Failed to read ${path}:${error}`);
                return [];
            }
        }
    }

    const getById = async (path: string) => {
        if (db) {
            const dataRef = ref(db, path);
            try {
                const dataSnapshot = await get(dataRef);
                if (dataSnapshot.exists()) {
                    return dataSnapshot.val();
                }
                return {};
            } catch (error) {
                console.error(`Failed to read ${path}`);
            }
        }
    }

    const create = async (path: string, data: any) => {
        if (db) {
            try {
                const dataRef = ref(db, path);
                const newKey = push(dataRef).key;
                if (!newKey) {
                    throw new Error('Failed to create key');
                }
                update(dataRef, {
                    [newKey]: { ...data, createdAt: serverTimestamp() },
                });
                return newKey;
            } catch (error) {
                console.error(`Failed to create data in ${path}:${error}`);
            }

        }
    }

    const modify = async (path: string, data: any) => {
        if (db) {
            try {
                const dataRef = ref(db, path);
                update(dataRef, { ...data, updatedAt: serverTimestamp() });
            } catch (error) {
                console.error(`Failed to update data in ${path}:${error}`);
            }
        }
    }

    const rem = async (path: string) => {
        if (db) {
            try {
                const dataRef = ref(db, path);
                remove(dataRef);
            } catch (error) {
                console.error(`Failed to remove data in ${path}:${error}`);
            }
        }
    }

    return {
        getAll,
        getById,
        create,
        modify,
        rem
    }
}

export default useFirebaseDB;