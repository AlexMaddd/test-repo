import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  MenuItem,
  Typography,
} from "@mui/material";
import SelectFilter from "../../components/Select/SelectFilter";
import BranchType from "../../types/Branch";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAppDispatch } from "../../hooks/hooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { branchSet } from "../../state/slices/branchSlice";
import Swal from "sweetalert2";
import { logout } from "../../state/actions/authActions";

type BranchSelectionDialog = {
  open: boolean;
  onClose: () => void;
};

const BranchSelection = (props: BranchSelectionDialog) => {
  const { open, onClose } = props;

  const { error, loading } = useAxios({
    method: "get",
    url: "branches/all",
    onSuccess(data) {
      if (data != undefined) {
        setBranches(data.data);
        let index: BranchType = data.data[0];
        setBranch(index);
      }
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const userRole = useSelector((state: any) => state.root?.auth?.profile?.role);
  const isLoggedIn = useSelector((state: any) => state.root?.auth?.isLoggedIn);

  const [branch, setBranch] = useState<BranchType>();
  const [branches, setBranches] = useState<BranchType[]>([]);

  useEffect(() => {
    if (error.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }, [error]);

  const handleClose = () => {
    dispatch(logout());
    onClose();
  };

  const handleChange = (id: string) => {
    let branch: BranchType = {
      id: "",
      name: "",
      address: "",
      employees: [],
    };

    branch = branches.reduce(
      (res, branch) => {
        if (branch.id === id) res = branch;

        return res;
      },
      { id: "", name: "", address: "", employees: [] }
    );

    setBranch(branch);
  };

  const proceed = () => {
    if (isLoggedIn == true && branch != null) {
      dispatch(branchSet({ type: "branch/branchSet", payload: branch }));
      // if (userRole == "Admin" || userRole == "Developer") navigate("/");
      // else navigate("/cashier");
      navigate("/");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Select branch before proceeding",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
      <DialogContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flexGrow: 1,
          }}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            Branch Selection
          </Typography>
          <Divider sx={{ width: "100%" }} />
          {loading ? (
            <CircularProgress />
          ) : (
            <SelectFilter
              value={branch?.id ?? ""}
              items={branches.map((item) => (
                <MenuItem key={item.id} value={item.id} sx={{ width: "400px" }}>
                  {item.name}
                </MenuItem>
              ))}
              onChange={(e: any) => handleChange(e.target.value)}
              fullWidth={true}
            />
          )}
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{ borderRadius: "10px", width: "100px" }}
              onClick={() => proceed()}
            >
              Proceed
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: "10px",
                width: "100px",
                backgroundColor: "#EB1C24",
                "&: hover": {
                  backgroundColor: "#EB1C24",
                },
                "&: focus": {
                  backgroundColor: "#EB1C24",
                },
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BranchSelection;
