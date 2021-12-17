import { SHOW_VIEW_DRAWER, SHOW_EDIT_DRAWER, SHOW_CREATE_DRAWER, useLayout } from "./LayoutContext";

const useSideDrawer = () => {
    const { layoutDispatch } = useLayout();

    const showViewDrawer = (show: boolean) => {
        layoutDispatch({ type: SHOW_VIEW_DRAWER, payload: show });
    }

    const showEditDrawer = (show: boolean) => {
        if (!show) {
            layoutDispatch({ type: SHOW_VIEW_DRAWER, payload: show });
            setTimeout(() => {
                layoutDispatch({ type: SHOW_EDIT_DRAWER, payload: show });
            }, 500);
        } else {
            layoutDispatch({ type: SHOW_EDIT_DRAWER, payload: show });
        }

    }

    const showCreateDrawer = (show: boolean) => {
        layoutDispatch({ type: SHOW_CREATE_DRAWER, payload: show });
    }

    return {
        showViewDrawer,
        showEditDrawer,
        showCreateDrawer
    }
}

export default useSideDrawer;