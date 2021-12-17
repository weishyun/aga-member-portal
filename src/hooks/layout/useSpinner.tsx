import { SHOW_LOADING, useLayout } from "./LayoutContext";

const useSpinner = () => {
    const { layoutDispatch } = useLayout();

    const setLoading = (show: boolean) => {
        layoutDispatch({ type: SHOW_LOADING, payload: show });
    }

    return {
        setLoading
    }
}

export default useSpinner;