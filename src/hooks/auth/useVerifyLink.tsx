import useFirebaseFunction from "../firebase/useFirebaseFunction"

const useVerifyLink = () => {
    const { call } = useFirebaseFunction();

    const activateEmail = async (uid: string, code: string) => {
        return await call('extRegistration-verifyEmail', { uid, code });
    }

    const validateLink = async () => {

    }

    const resetPassword = async () => {

    }

    return {
        activateEmail,
        validateLink,
        resetPassword
    }
}

export default useVerifyLink;