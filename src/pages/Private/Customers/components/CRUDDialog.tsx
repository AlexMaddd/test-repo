import { forwardRef, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import CRUDDialogHeader from "../../../../components/Dialogs/CRUDDialogHeader";
import Swal from "sweetalert2";
import useAxios from "../../../../hooks/useAxios";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import CustomerType from "../../../../types/Customer";

type CRUDDialog = {
  open: boolean;
  onClose: () => void;
  action: string;
  selectedData?: CustomerType; //any | null;
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
    url: "customers",
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

  const save = (values: CustomerType) => {
    // Avoids changing values of form
    let data: CustomerType = {
      ...values,
    };

    if (action === "Edit") data.id = selectedData?.id;

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
          module="Customer"
        />
        <Formik
          initialValues={{
            fname: selectedData?.fname ? selectedData.fname : "",
            mname: selectedData?.mname ? selectedData.mname : "",
            lname: selectedData?.lname ? selectedData.lname : "",
            email: selectedData?.email ? selectedData.email : "",
            contact_number: selectedData?.contact_number
              ? selectedData?.contact_number
              : "",
          }}
          onSubmit={(values) => {
            save(values);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
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
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  value={values.email}
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
                  <TextField
                    required
                    name="contact_number"
                    label="Contact Number"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    value={values.contact_number}
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
                  ></Box>
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
