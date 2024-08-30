import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { login, logout } from "../../state/actions/authActions";
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import Swal from "sweetalert2";
// import BranchSelection from "../Private/BranchSelection";
// import { useState } from "react";

import logo from "../../assets/logo_black.png";

const BranchSelection = lazy(() => import("../Private/BranchSelection"));

const Login = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector((state: any) => state.root?.auth?.isLoggedIn);
  // const userRole = useSelector((state: any) => state.root?.auth?.profile?.role);
  // const branch_id = useSelector(
  //   (state: any) => state.root?.auth?.profile?.branch_id
  // );

  const cardWidth = 550;
  const cardHeight = 400;

  const [openDialog, setOpenDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (values: { email: string; password: string }) => {
    dispatch(login(values)).catch(() => {
      setErrorMsg("Login Failed");
    });
  };

  // for when user types /login in url without using log out buttong
  useEffect(() => {
    dispatch({ type: "branch/branchClear" });
    dispatch(logout());
  }, []);

  useEffect(() => {
    if (isLoggedIn == true) {
      setOpenDialog(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (errorMsg.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: errorMsg,
        showConfirmButton: false,
        timer: 3000,
      });

      setErrorMsg("");
    }
  }, [errorMsg]);

  return (
    <>
      {isLoggedIn ? (
        <Suspense fallback={<CircularProgress />}>
          <BranchSelection
            open={openDialog}
            onClose={() => setOpenDialog(false)}
          />
        </Suspense>
      ) : null}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ height: "50vh", backgroundColor: "#28243D" }} />
        <Paper
          elevation={24}
          sx={{
            display: "flex",
            padding: "20px",
            width: cardWidth,
            height: cardHeight,
            position: "absolute",
            alignSelf: "center",
            borderRadius: "10px",
            border: 0,
            borderColor: "white",
          }}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "50%",
                    padding: "10px",
                  }}
                >
                  <img src={logo} />
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "50%",
                    padding: "10px",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      fontWeight="bold"
                      variant="subtitle2"
                      justifyContent="start"
                    >
                      Username:{" "}
                    </Typography>
                    <TextField
                      name="email"
                      size="small"
                      value={values.email}
                      onChange={handleChange}
                      InputProps={{
                        style: {
                          borderRadius: "10px",
                          alignSelf: "end",
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Typography fontWeight="bold" variant="subtitle2">
                      Password:{" "}
                    </Typography>
                    <TextField
                      name="password"
                      size="small"
                      value={values.password}
                      onChange={handleChange}
                      type="password"
                      InputProps={{
                        style: {
                          borderRadius: "10px",
                        },
                      }}
                    />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#8C57FF",
                      width: "310px",
                      borderRadius: "10px",
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Paper>
        <Box sx={{ height: "50vh", backgroundColor: "#FFFFF" }} />
      </Box>
    </>
  );
};

export default Login;
