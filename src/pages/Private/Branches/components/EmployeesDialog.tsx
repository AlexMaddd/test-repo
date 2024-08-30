import { Suspense, forwardRef, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CRUDDialogHeader from "../../../../components/Dialogs/CRUDDialogHeader";
import AddEmployeeDialog from "./AddEmployeeDialog";
import { useSelector } from "react-redux";
import BranchEmployeeType from "../../../../types/BranchEmployee";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../../hooks/hooks";
import { TransitionProps } from "@mui/material/transitions";
import RowActionButton from "../../../../components/Buttons/RowActionButton";
import DeleteIcon from "@mui/icons-material/Delete";

type EmployeesDialog = {
  open: boolean;
  onClose: () => void;
  //   selectedData?: BranchType; //any | null;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EmployeesDialog = (props: EmployeesDialog) => {
  const { open, onClose } = props;

  const dispatch = useAppDispatch();

  const { callApi: removeEmployee } = useAxios({
    method: "delete",
    url: "branches/remove-employee",
    immediate: false,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Saved",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        dispatch({
          type: "branch/branchDeleteEmployee",
          payload: { id: data.id },
        });
      });
    },
  });

  const branchName = useSelector((state: any) => state.root?.branch?.name);
  const employees: BranchEmployeeType[] = useSelector(
    (state: any) => state.root?.branch?.employees
  );

  // const [employees, setEmployees] = useState<BranchEmployeeType[]>([]);
  const [refresh, _setRefresh] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const tableCols = [
    "Employee Code",
    "First Name",
    "Middle Name",
    "Last Name",
    "Actions",
  ];

  const handleClose = () => {
    onClose();
  };

  const remove = (data: BranchEmployeeType) => {
    Swal.fire({
      icon: "warning",
      title: "Confirm",
      text: "Remove employee from current branch?",
      showConfirmButton: true,
    }).then((res) => {
      if (res.isConfirmed) removeEmployee({ id: data.employee_id });
    });
  };

  useEffect(() => {
    if (refresh) {
      // add employee
    }
  }, [refresh]);

  useEffect(() => {
    // if (
    //   selectedData?.employees != undefined &&
    //   selectedData.employees.length > 0
    // ) {
    //   setEmployees(selectedData.employees);
    // }
  }, []);

  return (
    <>
      <Suspense fallback={<CircularProgress />}>
        <AddEmployeeDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      </Suspense>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth={true}
        // PaperProps={{
        //   sx: {
        //     minHeight: "90%",
        //     maxHeight: "90%",
        //   },
        // }}
        maxWidth="md"
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            // height: "100%",
            gap: 1,
          }}
        >
          <CRUDDialogHeader
            handleClose={handleClose}
            action={branchName + " Branch"}
            module="Employees"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              padding: 2,
              width: "100%",
              alignItems: "center",
              // alignSelf: "center",
              // height: "100vh",
            }}
          >
            <Button
              sx={{
                alignSelf: "end",
                background: "#8C57FF",
                borderRadius: "10px",
                height: "40px",
              }}
              onClick={() => setOpenDialog(true)}
              variant="contained"
            >
              <Typography fontSize={20}>+</Typography>
            </Button>
            <TableContainer>
              <Table stickyHeader>
                <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableRow>
                    {tableCols.map((col, index) => (
                      <TableCell
                        key={index}
                        size="small"
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: "#F5F5F5",
                          padding: "15px",
                        }}
                        align="center"
                      >
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees
                    ? employees.map((employee, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">
                            {employee?.employee?.employee_code}
                          </TableCell>
                          <TableCell align="center">
                            {employee?.employee?.fname}
                          </TableCell>
                          <TableCell align="center">
                            {employee?.employee?.mname}
                          </TableCell>
                          <TableCell align="center">
                            {employee?.employee?.lname}
                          </TableCell>
                          <TableCell align="center">
                            {/* <Button
                              variant="contained"
                              color="warning"
                              onClick={() => remove(employee)}
                            >
                              Remove Employee
                            </Button> */}
                            <RowActionButton
                              color="red"
                              icon={<DeleteIcon />}
                              onClick={() => remove(employee)}
                              title="Remove Employee"
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeesDialog;
