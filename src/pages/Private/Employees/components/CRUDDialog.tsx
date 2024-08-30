import { forwardRef, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import CRUDDialogHeader from "../../../../components/Dialogs/CRUDDialogHeader";
import Swal from "sweetalert2";
import useAxios from "../../../../hooks/useAxios";
import { format } from "date-fns";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import EmployeeType from "../../../../types/Employee";

type CRUDDialog = {
  open: boolean;
  onClose: () => void;
  action: string;
  selectedData?: EmployeeType; //any | null;
  refresh: () => void;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CRUDDialog = (props: CRUDDialog) => {
  const { open, onClose, action, selectedData, refresh } = props;

  const { callApi: saveData } = useAxios({
    method: action === "Add" ? "post" : "put",
    url: "employees",
    immediate: false,
    onSuccess() {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Saved",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        handleClose();
      });
    },
  });

  const [disabled, setDisabled] = useState(false);

  const handleClose = () => {
    refresh();
    onClose();
  };

  const save = (values: EmployeeType) => {
    // Avoids changing values of form
    let data: EmployeeType = {
      ...values,
    };

    if (action === "Edit") data.id = selectedData?.id;
    data.date_of_birth = format(data.date_of_birth, "yyyy-MM-dd");
    data.start_date = format(data.start_date, "yyyy-MM-dd");
    data.end_date = format(data.end_date, "yyyy-MM-dd");
    data.employment_status = data.employment_status === true ? 1 : 0;

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
    if (action === "View") setDisabled(true);
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
      maxWidth="sm"
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
          action={action}
          module="Employee"
        />
        <Formik
          initialValues={{
            fname: selectedData?.fname ? selectedData.fname : "",
            mname: selectedData?.mname ? selectedData.mname : "",
            lname: selectedData?.lname ? selectedData.lname : "",
            employee_code: selectedData?.employee_code
              ? selectedData.employee_code
              : "",
            date_of_birth: selectedData?.date_of_birth
              ? new Date(selectedData.date_of_birth)
              : Date.now(),
            start_date: selectedData?.start_date
              ? new Date(selectedData.start_date)
              : Date.now(),
            end_date: selectedData?.end_date
              ? new Date(selectedData.end_date)
              : Date.now(),
            employment_status: selectedData?.employment_status
              ? selectedData.employment_status === 1
                ? true
                : false
              : false,
          }}
          onSubmit={(values) => {
            save(values);
          }}
        >
          {({ values, handleChange, setFieldValue, handleSubmit }) => (
            <>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  padding: 2,
                  // height: "100vh",
                }}
              >
                <TextField
                  required
                  name="fname"
                  label="First Name"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  value={values.fname}
                  onChange={handleChange}
                  sx={{
                    fieldset: {
                      borderColor: "#8C57FF",
                      borderRadius: "10px",
                    },
                  }}
                  disabled={disabled}
                />
                <TextField
                  required
                  name="mname"
                  label="Middle Name"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  value={values.mname}
                  onChange={handleChange}
                  sx={{
                    fieldset: {
                      borderColor: "#8C57FF",
                      borderRadius: "10px",
                    },
                  }}
                  disabled={disabled}
                />
                <TextField
                  required
                  name="lname"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  value={values.lname}
                  onChange={handleChange}
                  sx={{
                    fieldset: {
                      borderColor: "#8C57FF",
                      borderRadius: "10px",
                    },
                  }}
                  disabled={disabled}
                />
                <TextField
                  required
                  name="employee_code"
                  label="Employee Code"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  value={values.employee_code}
                  onChange={handleChange}
                  sx={{
                    fieldset: {
                      borderColor: "#8C57FF",
                      borderRadius: "10px",
                    },
                  }}
                  disabled={disabled}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date of Birth"
                      value={values.date_of_birth}
                      format="yyyy-MM-dd"
                      onChange={(value) =>
                        setFieldValue("date_of_birth", value, true)
                      }
                      sx={{
                        // width: "50%",
                        fieldset: {
                          borderColor: "#8C57FF",
                        },
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                      disabled={disabled}
                    />
                  </LocalizationProvider>

                  <FormControlLabel
                    value="start"
                    control={
                      <Checkbox
                        color="primary"
                        checked={values.employment_status}
                        onChange={(e) => {
                          setFieldValue("employment_status", e.target.checked);
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#8C57FF",
                          },
                        }}
                        disabled={disabled}
                      />
                    }
                    label="Employment Status"
                    labelPlacement="start"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={values.start_date}
                      format="yyyy-MM-dd"
                      onChange={(value) =>
                        setFieldValue("start_date", value, true)
                      }
                      sx={{
                        width: "100%",
                        fieldset: {
                          borderColor: "#8C57FF",
                        },
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                      disabled={disabled}
                    />
                    <DatePicker
                      label="End Date"
                      value={values.end_date}
                      format="yyyy-MM-dd"
                      onChange={(value) =>
                        setFieldValue("end_date", value, true)
                      }
                      sx={{
                        width: "100%",
                        fieldset: {
                          borderColor: "#8C57FF",
                        },
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                      disabled={disabled}
                    />
                  </LocalizationProvider>
                </Box>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    borderRadius: "10px",
                    width: "120px",
                    height: "40px",
                    mr: "10px",
                    alignSelf: "end",
                    backgroundColor: "#8C57FF",
                  }}
                >
                  <Typography fontSize={"12px"} fontWeight={"bold"}>
                    {action}
                  </Typography>
                </Button>
              </Box>
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CRUDDialog;
