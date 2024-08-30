import { Box, Button, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { format } from "date-fns";
import SizeConfigs from "../config";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// TODO FOR LATE
// put dates in utils
// css if possible in styles folder
const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: any) => state.root?.auth?.isLoggedIn);
  const userRole = useSelector((state: any) => state.root?.auth?.profile?.role);
  const userName = useSelector(
    (state: any) => state.root?.auth?.profile?.username
  );

  const signOut = () => {
    // dispatch(logout());
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn]);

  return (
    <AppBar
      position="fixed"
      sx={{
        width:
          userRole != "Cashier"
            ? `calc(100% - ${SizeConfigs.sidebar.width})`
            : "100%", // sidebar width
        ml: SizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: "#312D4B",
      }}
    >
      <Toolbar
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography fontWeight={"bold"}>
            {format(new Date(), "eeee")}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>{format(new Date(), "MMMM dd, yyyy")}</Typography>
            <div style={{ marginLeft: "3px", marginRight: "3px" }}>|</div>
            <Typography>{format(new Date(), "h:mm a")}</Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          onClick={signOut}
          sx={{
            borderRadius: "10px",
            borderColor: "#FFFFFF",
            fontSize: "10px",
            "&: hover": {
              borderColor: "#FFFFFF",
            },
          }}
        >
          <Typography
            fontSize={"11px"}
            fontWeight="bold"
            color={"white"}
            sx={{ mr: "10px" }}
          >
            {userName}
          </Typography>
          <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
