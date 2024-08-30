import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Items from "../pages/Private/Items/Items";
import Services from "../pages/Private/Services/Services";
import Packages from "../pages/Private/Packages/Packages";
import Vehicles from "../pages/Private/Vehicles/Vehicles";
import Brands from "../pages/Private/Brands/Brands";
import Types from "../pages/Private/Types/Types";

const MainLayout = lazy(() => import("../components/Layout/MainLayout"));
const Dashboard = lazy(() => import("../pages/Private/Dashboard/Dashboard"));
const Employees = lazy(() => import("../pages/Private/Employees/Employees"));
const Customers = lazy(() => import("../pages/Private/Customers/Customers"));
const Reports = lazy(() => import("../pages/Private/Reports/Reports"));
const Branches = lazy(() => import("../pages/Private/Branches/Branches"));
const Transactions = lazy(
  () => import("../pages/Private/Transactions/Transactions")
);

const Login = lazy(() => import("../pages/Public/Login"));
const NotFound = lazy(() => import("../pages/Public/NotFound"));

// import UserRoutes from "./UserRoutes";
// import AdminRoutes from "./AdminRoutes";
// used for App.ts routes
export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "branches",
        element: <Branches />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "vehicles",
        element: <Vehicles />,
      },
      {
        path: "items",
        element: <Items />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "types",
        element: <Types />,
      },
      {
        path: "packages",
        element: <Packages />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      // {
      //   path: "settings",
      //   element: <Settings />,
      //   children: [
      //     {
      //       path: "unit-measurement",
      //       element: <UnitMeasurement />,
      //     },
      //     {
      //       path: "generic-name",
      //       element: <GenericName />,
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense>
        <NotFound />
      </Suspense>
    ),
  },
]);

// export const router = createBrowserRouter(UserRoutes())
