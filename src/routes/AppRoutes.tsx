import { SyncAlt } from "@mui/icons-material";
import { RouteType } from "./config";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import DescriptionIcon from "@mui/icons-material/Description";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CategoryIcon from "@mui/icons-material/Category";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LabelIcon from "@mui/icons-material/Label";

const iconColor = "#E7E3FC";

// used for NavBar display
export const AppRoutes: RouteType[] = [
  {
    index: true,
    path: "/",
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardIcon sx={{ color: iconColor }} />,
    },
  },
  {
    path: "/branches",
    state: "branches",
    sidebarProps: {
      displayText: "Branches",
      icon: <SyncAlt sx={{ color: iconColor }} />,
    },
  },
  {
    path: "/transactions",
    state: "transactions",
    // isOpen: false,
    sidebarProps: {
      displayText: "Transactions",
      icon: <ReceiptLongIcon sx={{ color: iconColor }} />,
    },
  },
  {
    path: "/employees",
    state: "employees",
    sidebarProps: {
      displayText: "Employees",
      icon: <PeopleIcon sx={{ color: iconColor }} />,
    },
  },
  {
    path: "/customers",
    state: "customers",
    // isOpen: false,
    sidebarProps: {
      displayText: "Customers",
      icon: <PersonIcon sx={{ color: iconColor }} />,
    },
  },
  {
    path: "/vehicles",
    state: "vehicles",
    // isOpen: false,
    sidebarProps: {
      displayText: "Vehicles",
      icon: <DirectionsCarIcon sx={{ color: iconColor }} />,
    },
  },
  {
    path: "/items",
    state: "items",
    // isOpen: false,
    sidebarProps: {
      displayText: "Items",
      icon: <CategoryIcon sx={{ color: iconColor }} />,
    },
  },
  {
    path: "/services",
    state: "services",
    // isOpen: false,
    sidebarProps: {
      displayText: "Services",
      icon: <DensitySmallIcon sx={{ color: iconColor }} />,
    },
  },
  {
    path: "/brands",
    state: "brands",
    // isOpen: false,
    sidebarProps: {
      displayText: "Brands",
      icon: <LabelIcon sx={{ color: iconColor }} />,
    },
  },
  {
    path: "/types",
    state: "types",
    // isOpen: false,
    sidebarProps: {
      displayText: "Types",
      icon: <CategoryIcon sx={{ color: iconColor }} />,
    },
  },
  // {
  //   path: "/packages",
  //   state: "packages",
  //   // isOpen: false,
  //   sidebarProps: {
  //     displayText: "Packages",
  //     icon: <ManageAccountsIcon sx={{ color: iconColor }} />,
  //   },
  // },
  {
    path: "/reports",
    state: "reports",
    // isOpen: false,
    sidebarProps: {
      displayText: "Reports",
      icon: <SummarizeIcon sx={{ color: iconColor }} />,
    },
  },
];

export default AppRoutes;
