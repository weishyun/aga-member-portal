import React from "react";

export interface RouteInfo {
    id: string,
    name: string,
    path: string,
    icon?: string,
    component?: any,
    children?: RouteInfo[]
}

const ReactLazyPreload = (importStatement: any) => {
    const Component: any = React.lazy(importStatement);
    Component.preload = importStatement;
    return Component;
};

//preload pages


export const protectedRoutes: RouteInfo[] = [
    
];