import React from "react";

export interface AnonymousRouteInfo {
    name: string,
    path: string,
    component: any
}

const ReactLazyPreload = (importStatement: any) => {
    const Component: any = React.lazy(importStatement);
    Component.preload = importStatement;
    return Component;
};

//preload pages
const Register = ReactLazyPreload(() => import("./pages/auth/Register"));
Register.preload();
const RegisterEmployer = ReactLazyPreload(() => import("./pages/auth/RegisterEmployer"));
RegisterEmployer.preload();
const RegisterGig = ReactLazyPreload(() => import("./pages/auth/RegisterGig"));
RegisterGig.preload();
const CreateAccount = ReactLazyPreload(() => import("./pages/auth/CreateAccount"));
CreateAccount.preload();
const PasswordLogin = ReactLazyPreload(() => import("./pages/auth/PasswordLogin"));
PasswordLogin.preload();

export const anonymousRoutes: AnonymousRouteInfo[] = [
    {
        name: 'Register',
        path: '/auth/register',
        component: Register
    },
    {
        name: 'RegisterEmployer',
        path: '/auth/register-employer',
        component: RegisterEmployer
    },
    {
        name: 'RegisterGig',
        path: '/auth/register-gig',
        component: RegisterGig
    },
    {
        name: 'CreateAccount',
        path: '/auth/create-account',
        component: CreateAccount
    },
    {
        name: 'PasswordLogin',
        path: '/auth/password-login',
        component: PasswordLogin
    }
];