import useFirebaseFunction from "../firebase/useFirebaseFunction";

const useBasicProfile = () => {
    const { call } = useFirebaseFunction();

    const createEmployerBasicProfile = async (data: any) => {
        return await call('extRegistration-createEmployer', data);
    }


    const createGigWorkerBasicProfile = async (data: any) => {
        return await call('extRegistration-createGig', data).catch(err=>console.error(JSON.stringify(err)));
    }

    return {
        createEmployerBasicProfile,
        createGigWorkerBasicProfile
    }
}

export default useBasicProfile;