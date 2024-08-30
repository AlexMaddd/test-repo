import { useAppDispatch } from "../../../../hooks/hooks";
import {
  Box,
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
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import DialogType from "../../../../types/Dialog";
import CRUDDialogHeader from "../../../../components/Dialogs/CRUDDialogHeader";
import useAxios from "../../../../hooks/useAxios";
import EmployeeType from "../../../../types/Employee";
import Swal from "sweetalert2";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RowActionButton from "../../../../components/Buttons/RowActionButton";

type Dialog = DialogType;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddEmployeeDialog = (props: Dialog) => {
  const dispatch = useAppDispatch();

  const { open, onClose } = props;

  const { callApi, loading } = useAxios({
    method: "get",
    url: "employees",
    immediate: false,
    onSuccess(data) {
      if (data != undefined) {
        setEmployees(data?.data.data);
        //     data?.data.next_page_url == null
        //       ? setHasNextPage(false)
        //       : setHasNextPage(true);
        //     data?.data.prev_page_url == null
        //       ? setHasPrevPage(false)
        //       : setHasPrevPage(true);
        //     let noOfPages = data?.data.links.length;
        //     setTotalPages(noOfPages - 2);
      }
    },
  });

  const { callApi: addEmployee } = useAxios({
    method: "get",
    url: "branches/assign-employee",
    immediate: false,
    onSuccess(data) {
      let resData = data.data.data;
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Saved",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        // used reduce because setState returns undefined when reaching this section
        let emp: EmployeeType = employees.reduce((res, employee) => {
          if (employee.id === resData.employee_id) res = employee;

          return res;
        });
        dispatch({
          type: "branch/branchAddEmployee",
          payload: {
            id: resData.id,
            branch_id: resData.branch_id,
            employee_id: resData.employee_id,
            employee: emp,
          },
        });
        handleClose();
      });
    },
  });

  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  const tableCols = [
    "Employee Code",
    "First Name",
    "Middle Name",
    "Last Name",
    "Action",
  ];

  const add = (data: EmployeeType) => {
    Swal.fire({
      icon: "question",
      title: "Confirm",
      text: "Add employee to current branch?",
      showConfirmButton: true,
    }).then((res) => {
      if (res.isConfirmed) addEmployee({ id: data.id });
    });
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
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
          action={"Add"}
          module="Employee"
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
          {loading ? (
            <CircularProgress />
          ) : (
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
                  {employees.map((employee, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {employee.employee_code}
                      </TableCell>
                      <TableCell align="center">{employee.fname}</TableCell>
                      <TableCell align="center">{employee.mname}</TableCell>
                      <TableCell align="center">{employee.lname}</TableCell>
                      <TableCell align="center">
                        <RowActionButton
                          color="purple"
                          icon={<AddCircleOutlineIcon />}
                          onClick={() => add(employee)}
                          title="Add Employee"
                        />
                        {/* <Button
                          variant="contained"
                          onClick={() => add(employee)}
                        ></Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
