import { forwardRef, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CRUDDialogHeader from "../../../../components/Dialogs/CRUDDialogHeader";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";
import { TransitionProps } from "@mui/material/transitions";
import RowActionButton from "../../../../components/Buttons/RowActionButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TransactionType from "../../../../types/Transaction";
import EmployeeType from "../../../../types/Employee";
import { useSelector } from "react-redux";

type ItemsDialog = {
  open: boolean;
  onClose: () => void;
  transaction?: TransactionType;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TransactionEmployeesDialog = (props: ItemsDialog) => {
  const { open, onClose, transaction } = props;

  const defaultEmployee: EmployeeType = {
    id: "",
    fname: "",
    mname: "",
    lname: "",
    employee_code: "",
    date_of_birth: undefined,
    start_date: undefined,
    end_date: undefined,
    employment_status: 0,
  };

  const { loading: _getEmployeesLoading, callApi: getEmployees } = useAxios({
    method: "get",
    url: "branches",
    immediate: false,
    onSuccess(data) {
      if (data != undefined) {
        let temp: any[] = data.data.employees;
        let tempEmployees: EmployeeType[] = [];

        temp.map((emp: any) => {
          tempEmployees.push(emp.employee);
        });

        tempEmployees.splice(0, 0, defaultEmployee);

        setEmployees(tempEmployees);
      }
    },
  });

  const {
    loading: getAssignedEmployeesLoading,
    callApi: getAssignedEmployees,
  } = useAxios({
    method: "get",
    url: "transactions",
    immediate: false,
    onSuccess(data) {
      if (data != undefined) {
        let temp: any[] = data.data.employees;
        let tempEmployees: EmployeeType[] = [];

        if (temp.length > 0) {
          temp.map((emp: any) => {
            tempEmployees.push(emp.employee);
          });

          setAssignedEmployees(tempEmployees);
        }
      }
    },
  });

  const { callApi: saveData } = useAxios({
    method: "post",
    url: "transactions",
    immediate: false,
    onSuccess() {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Saved",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        onClose();
      });
    },
  });

  const branch_id = useSelector((state: any) => state.root?.branch?.id);

  const [assignedEmployees, setAssignedEmployees] = useState<EmployeeType[]>(
    []
  );
  const [ids, _setIDs] = useState(new Set<string>());
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [selectedData, setSelectedData] =
    useState<EmployeeType>(defaultEmployee);

  const tableCols = ["Employee Code", "Employee Name", "Action"];

  const handleClose = () => {
    onClose();
  };

  const onAddRemoveEmployee = (data?: EmployeeType) => {
    if (selectedData.id != "") {
      if (!ids.has(selectedData.id ?? "")) {
        setAssignedEmployees((x) => [...x, selectedData]);
        setSelectedData(defaultEmployee);
        ids.add(selectedData.id ?? "");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Item already exists.",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          setSelectedData(defaultEmployee);
        });
      }
    } else if (data != undefined) {
      let temp: EmployeeType[] = assignedEmployees.reduce(
        (arr: EmployeeType[], emp) => {
          if (data.id != emp.id) arr.push(emp);

          return arr;
        },
        []
      );

      ids.delete(data?.id ?? "");
      setAssignedEmployees(temp);
    }
  };

  const save = () => {
    let emp_ids: string[] = [];

    assignedEmployees.map((emp) => {
      emp_ids.push(emp.id ?? "");
    });

    let data = {
      origin: "Transaction Employees",
      id: transaction?.id,
      employees: emp_ids,
    };

    Swal.fire({
      icon: "question",
      title: "Confirm",
      text: "Proceed with save?",
      showConfirmButton: true,
    }).then((res) => {
      if (res.isConfirmed) saveData(data);
    });
  };

  useEffect(() => {
    if (open === true) {
      getEmployees({ id: branch_id });
      getAssignedEmployees({ id: transaction?.id ?? "" });
    }

    return () => {
      setEmployees([]);
      setAssignedEmployees([]);
      setSelectedData(defaultEmployee);
    };
  }, [open]);

  return (
    <>
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
            action={"Transaction"}
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
              height: "100vh",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={10} lg={10}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={employees ?? []}
                  getOptionKey={(option) => option.id ?? ""}
                  getOptionLabel={(option) =>
                    option.id != ""
                      ? `${option.fname} ${option.mname} ${option.lname}`
                      : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  noOptionsText={"Search for customer"}
                  value={selectedData}
                  onChange={(_event, newValue) => {
                    if (newValue != null) {
                      setSelectedData(newValue);
                    }
                  }}
                  fullWidth={true}
                  size="small"
                  ListboxProps={{ style: { maxHeight: "10rem" } }}
                  componentsProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "flip",
                          enabled: false,
                        },
                        // {
                        //   name: "preventOverflow",
                        //   enabled: true,
                        // },
                      ],
                    },
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Employees" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <Button
                  sx={{
                    alignSelf: "end",
                    background: "#8C57FF",
                    borderRadius: "10px",
                    height: "40px",
                  }}
                  onClick={() => onAddRemoveEmployee()}
                  variant="contained"
                >
                  <Typography fontSize={20}>+</Typography>
                </Button>
              </Grid>
            </Grid>
            {getAssignedEmployeesLoading ? (
              <CircularProgress />
            ) : (
              <TableContainer sx={{ height: "55vh", maxHeight: "55vh" }}>
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
                    {assignedEmployees
                      ? assignedEmployees.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell align="center">
                              {item.employee_code}
                            </TableCell>
                            <TableCell align="center">
                              {item.full_name}
                            </TableCell>
                            <TableCell align="center">
                              <RowActionButton
                                color="red"
                                icon={<DeleteIcon />}
                                onClick={() => onAddRemoveEmployee(item)}
                                title="Remove Item"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <Button
              variant="contained"
              sx={{
                borderRadius: "10px",
                width: "120px",
                height: "40px",
                mr: "10px",
                backgroundColor: "#8C57FF",
                alignSelf: "end",
              }}
              onClick={() => save()}
            >
              <Typography fontSize={"12px"} fontWeight={"bold"}>
                Save
              </Typography>
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionEmployeesDialog;
