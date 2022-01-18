import React, { Suspense, useEffect, useMemo } from 'react';
import messages_en from './assets/i18n/en.json';
import './App.less';
import { INITIALIZE_FIREBASE, useFirebase } from './hooks/firebase/FirebaseContext';
import useAuthAction from './hooks/auth/useAuthAction';
import { useLayout } from './hooks/layout/LayoutContext';
import { protectedRoutes, RouteInfo } from './routes-protected';
import { Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Layout, Spin } from 'antd';
import NoMatch from './NoMatch';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import AppProtected from './AppProtected';
import Auth from './pages/auth/Auth';
import { anonymousRoutes } from './routes-anonymous';
const Term = React.lazy(() => import("./pages/terms/Terms"));
const Privacy = React.lazy(() => import("./pages/terms/Privacy"));

const App = () => {
  const { firebaseState, firebaseDispatch } = useFirebase();
  const { checkLogin } = useAuthAction();
  const { layoutState } = useLayout();

  const messages: any = {
    'en': messages_en
  };

  useEffect(() => {
    firebaseDispatch({ type: INITIALIZE_FIREBASE });
  }, [firebaseDispatch])

  useEffect(() => {
    if (firebaseState.auth) {
      checkLogin();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseState.auth])

  const renderProtectedRoutes = useMemo(() => {
    return protectedRoutes.map((route: RouteInfo) => {
      if (route.children) {
        const childrenRoute = route.children.map((childRoute: RouteInfo) => {
          return (<Route key={childRoute.id} path={`${route.path}${childRoute.path}`} element={<childRoute.component />} />)
        });
        return [...childrenRoute];
      } else {
        return (<Route key={route.id} path={route.path} element={<route.component />} />)
      }
    })
  }, []);


  return (
    <IntlProvider locale={layoutState.locale} messages={messages[layoutState.locale]}>
      <Spin tip="Loading..." spinning={layoutState.showLoading}>
        <Layout className="app-container">
          <Suspense fallback={<Spin />}>
            <Routes>
              <Route path="/auth" element={<Auth />}>
                <Route index element={<Login />} />
                {
                  anonymousRoutes.map((a) =>
                    <Route key={a.name} path={a.path} element={<a.component />} />
                  )
                }
              </Route>
              <Route path="/term-of-use" element={<Term />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              {/* <Route path="/login" element={<Login />} /> */}
              < Route path="/" element={<AppProtected />}>
                <Route index element={<Dashboard />} />
                {renderProtectedRoutes}
              </Route>
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Suspense>
        </Layout>
      </Spin>
    </IntlProvider>
  );
}

export default App;
