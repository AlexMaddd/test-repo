import { Box, CircularProgress, Toolbar } from "@mui/material";
import SideBar from "../SideBar/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import SizeConfigs from "../config";
import { useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Unauthorized from "../../pages/Public/Unauthorized";

const MainLayout = () => {
  // const state = useSelector((state: any) => state);
  const isLoggedIn = useSelector((state: any) => state.root?.auth?.isLoggedIn);
  // const userRole = useSelector((state: any) => state.root?.auth?.profile?.role);
  // const allowedRoles = ["Developer", "Admin"];
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  // console.log(state, 'state')

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      if (
        // allowedRoles.find((role) => role == userRole) == undefined &&
        isLoggedIn
      ) {
        setAuth(true);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Unauthorized.",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          setAuth(false);
          navigate(-1);
          navigate("/login");
        });
      }
    }
  }, [isLoggedIn]);

  return (
    <>
      {auth ? (
        <Box sx={{ display: "flex", height: "100vh", maxHeight: "100vh" }}>
          <Header />
          <Box
            component="nav"
            sx={{
              width: SizeConfigs.sidebar.width, // size config
              flexShrink: 0,
              // backgroundColor:"#333333"
            }}
          >
            <SideBar />
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 5,
              width: `calc(100% - ${SizeConfigs.sidebar.width})`, // sidebar width
              height: "100%",
              maxHeight: "100%",
              backgroundColor: "#F0F3FB",
            }}
          >
            <Toolbar />
            <Suspense fallback={<CircularProgress />}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default MainLayout;
