// import { useState } from "react";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { RouteType } from "../../routes/config";
import { useState } from "react";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import SideBarItem from "./SideBarItem";

type Props = {
  item: RouteType;
};

const SidebarItemSubItem = ({ item }: Props) => {
  const [openState, setOpenStates] = useState<Map<string, boolean>>(
    new Map<string, boolean>([
      // ['masterlists', false],
      // ['sales', false],
      // ['delivery', false],
      ["admin-settings", false],
      ["settings", false],
    ])
  );

  const updateStates = (state: string) => {
    for (const key of openState.keys()) {
      if (key == state)
        setOpenStates(
          (map) =>
            new Map(map.set(key, openState.get(key) == false ? true : false))
        );
      else setOpenStates((map) => new Map(map.set(key, false)));
    }
    // openState.forEach((value, key) => {
    //     if(key == state)
    //         setOpenStates((map) => new Map(map.set(key, openState.get(key) == false ? true : false)));
    //     else
    //         setOpenStates((map) => new Map(map.set(key, false)));
    // })
  };

  return item.sidebarProps ? (
    <>
      <ListItemButton
        id={item.state}
        onClick={() => updateStates(item.state)}
        sx={{
          // direction:"flex",
          // alignContent:"center",
          // justifyContent:"start",
          mt: "15px",
          ml: "15px",
          mr: "15px",
          mb: "0px",
          "&: hover": {
            backgroundColor: "#5E676F",
            borderRadius: "5px",
            mt: "15px",
            ml: "15px",
            mr: "15px",
            mb: "0px",
          },
          "&: focus": {
            backgroundColor: "#104C82",
            borderRadius: "5px",
            color: "#FFFFFF",
            fontWeight: "bold",
            mt: "15px",
            ml: "15px",
            mr: "15px",
            mb: "0px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <ListItemIcon>
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon>
          {item.sidebarProps.displayText}
        </Box>
        {openState.get(item.state) ? (
          <ExpandLessOutlined sx={{ justifySelf: "end" }} />
        ) : (
          <ExpandMoreOutlined />
        )}
      </ListItemButton>
      {openState.get(item.state) == true ? (
        <Collapse in={openState.get(item.state)} timeout="auto">
          <List sx={{ p: 0 }}>
            {item.child?.map((route, index) =>
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemSubItem item={route} key={index} />
                ) : (
                  <SideBarItem item={route} key={index} />
                )
              ) : null
            )}
          </List>
        </Collapse>
      ) : null}
      {/* <Collapse in={openState.get(item.state)} timeout="auto">
                    <List>
                        {item.child?.map((route, index) => (
                            route.sidebarProps ? (
                                route.child ? (
                                    <SidebarItemSubItem item={route} key={index}/>
                                ) : (
                                    <SideBarItem item={route} key={index}/>
                                )
                            ) : null
                        ))}
                    </List>
                </Collapse> */}
    </>
  ) : null;
};

export default SidebarItemSubItem;
