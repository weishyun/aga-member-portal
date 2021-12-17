import { Layout } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "./hooks/auth/AuthContext";
// import Header from "./shared/components/header-footer/AdminHeader";
// import SideMenu from "./shared/components/side-menu/SideMenu";
const { Content } = Layout;

const AppProtected = () => {
    const { authState } = useAuth();
    const [collapsed, setCollaped] = useState(false);
    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!authState.isLogin) {
            nav('/login', { state: { from: location } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleSideNav = () => {
        setCollaped(!collapsed);
    };

    return (
        <>
            {/* <SideMenu collapsed={collapsed} /> */}
            <Layout className="site-layout">
                {/* <Header collapsed={collapsed} toggleSideNav={toggleSideNav} /> */}
                <Content className="site-layout-background">
                    <Outlet />
                </Content>
            </Layout>
        </>
    );
}

export default AppProtected;