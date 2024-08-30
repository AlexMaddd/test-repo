import {
  Box,
  Button,
  // Button,
  Divider,
  Drawer,
  List,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AppRoutes from "../../routes/AppRoutes";
import SideBarItem from "./SideBarItem";
import SizeConfigs from "../config";
import SidebarItemSubItem from "./SiedBarItemSubItem";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../state/actions/authActions";

import logo from "../../assets/logo_white.png";
import Swal from "sweetalert2";

const SideBar = () => {
  const dispatch = useDispatch();

  const branchName = useSelector((state: any) => state.root?.branch?.name);

  const onLogOut = () => {
    Swal.fire({
      icon: "question",
      title: "Confirm",
      text: "Proceed with log out?",
      showConfirmButton: true,
    }).then((res) => {
      if (res.isConfirmed) dispatch(logout());
    });
  };

  return (
    <>
      <Drawer
        id="drawer"
        variant="permanent"
        sx={{
          display: "flex",
          width: SizeConfigs.sidebar.width,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: SizeConfigs.sidebar.width,
            justifyContent: "space-between",
            boxSizing: "border-box",
            borderRight: "0px",
            backgroundColor: "#28243D",
            color: "#9A9A9A",
            height: "100%",
          },
        }}
      >
        <List disablePadding>
          <Toolbar>
            <Stack
              sx={{
                width: "100%",
              }}
              direction="row"
              justifyContent="center"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: "30px",
                  mb: "15px",
                  gap: 3,
                }}
              >
                <img src={logo} />
                {/* <Divider
                  light={true}
                  variant="middle"
                  sx={{ background: "#3F3F3F", width:'100%' }}
                /> */}
                <Typography sx={{ color: "#E7E3FC" }}>
                  {branchName} Branch
                </Typography>
              </Box>
            </Stack>
          </Toolbar>
          <Divider
            light={true}
            variant="middle"
            sx={{ background: "#3F3F3F" }}
          />
          {/* <Box
            sx={{
              m: "20px",
            }}
          >
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setOpenDialog(true)}
              sx={{
                borderRadius: "50px",
                borderColor: "#FFFFFF",
                fontSize: "10px",
                padding: "8px",
                "&: hover": {
                  borderColor: "#FFFFFF",
                },
              }}
              startIcon={<AddCircleOutlineIcon sx={{ color: "#FFFFFF" }} />}
            >
              <Typography fontSize={"10px"} color={"white"}>
                New Data
              </Typography>
            </Button>
          </Box> */}
          {/* <Divider
            light={true}
            variant="middle"
            sx={{ background: "#3F3F3F" }}
          /> */}
          <Box
            sx={{
              direction: "flex",
              flexDirection: "column",
              padding: 0,
            }}
          >
            {AppRoutes.map((route, index) =>
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemSubItem item={route} key={index} />
                ) : (
                  <SideBarItem item={route} key={index} />
                )
              ) : null
            )}
          </Box>
        </List>
        <Button
          sx={{
            margin: "15px",
            borderColor: "#E7E3FC",
            color: "#E7E3FC",
            borderRadius: "10px",
          }}
          variant="outlined"
          size="large"
          onClick={onLogOut}
        >
          Log Out
        </Button>
      </Drawer>
    </>
  );
};

export default SideBar;
