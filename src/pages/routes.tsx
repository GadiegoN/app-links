import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./_layout/auth";
import { AppLayout } from "./_layout/app";

import { SignIn } from "./auth/sign-in";

import { AdminLayout } from "./_layout/admin";
import { Dashboard } from "./admin/dashboard";
import { Home } from "./app/home";

import { PrivateRoute } from "./private-routes";
import { Social } from "./admin/social";
import { NotFound } from "./not-found";

export const router = createBrowserRouter([

    {
        path: '/',
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <Home /> },
        ]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: '/entrar', element: <SignIn /> },
        ]
    },
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            { path: '/painel', element: <PrivateRoute><Dashboard /></PrivateRoute> },
            { path: '/painel/social', element: <PrivateRoute><Social /></PrivateRoute> },
        ]
    },
])