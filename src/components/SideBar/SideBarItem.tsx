import { Box, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import { RouteType } from "../../routes/config";
import { Link } from "react-router-dom";

type Props = {
  item: RouteType;
};

const SideBarItem = ({ item }: Props) => {
  return item.sidebarProps && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        direction: "flex",
        // alignContent:"center",
        // justifyContent:"start",
        m: "15px",
        pl: "0px",
        color: "#E7E3FC",
        "&: hover": {
          backgroundColor: "#5E676F",
          borderRadius: "5px",
          m: "15px",
        },
        "&: focus": {
          backgroundColor: "#104C82",
          borderRadius: "5px",
          color: "#FFFFFF",
          fontWeight: "bold",
        },
      }}
    >
      {item.sidebarProps.icon === undefined ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            ml: "56px",
          }}
        >
          {item.sidebarProps.displayText}
        </Box>
      ) : (
        <>
          <ListItemIcon sx={{ minWidth: "auto", mr: "15px" }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon>
          <Typography>{item.sidebarProps.displayText}</Typography>
        </>
      )}
      {/* {item.child ? <ArrowForwardIcon fontSize="small"/> : null} */}
    </ListItemButton>
  ) : null;
};

export default SideBarItem;
