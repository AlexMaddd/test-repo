import { ReactNode } from "react";

export type RouteType = {
  // element: ReactNode,
  state: string;
  index?: boolean;
  path?: string;
  child?: RouteType[];
  //   isOpen?: boolean;
  sidebarProps?: {
    displayText: string;
    icon?: ReactNode;
  };
};
