import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { DEFAULT_PATH } from "./paths";
import LoadingScreen from "../component/LoadingScreen";
import AuthLayout from "../layouts/authLayout";
import DashboardLayout from "../layouts/dashboardLayout";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "verify", element: <VerifyPage /> }
      ],



    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "home", element: <HomePage /> },



        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const LoginPage = Loadable(lazy(() => import("../pages/Login")));
const RegisterPage = Loadable(lazy(() => import("../pages/Register")));
const VerifyPage = Loadable(lazy(() => import("../pages/Verify")));


const HomePage = Loadable(lazy(() => import("../pages/Home")));

const Page404 = Loadable(lazy(() => import("../pages/Page404")));