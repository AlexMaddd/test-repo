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
import TypeType from "../../../../types/Types";

type CRUDDialog = {
  open: boolean;
  onClose: () => void;
  action: string;
  selectedData?: TypeType; //any | null;
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
    url: "types",
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

  const save = (values: TypeType) => {
    // Avoids changing values of form
    let data: TypeType = {
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

    return () => {
      setDisabled(false);
    };
  }, [open]);

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
          module="Brand"
        />
        <Formik
          initialValues={{
            name: selectedData?.name ? selectedData.name : "",
            description: selectedData?.description
              ? selectedData.description
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
                  name="name"
                  label="Type Name"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  value={values.name}
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
                  name="description"
                  label="Description"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  value={values.description}
                  onChange={handleChange}
                  sx={{
                    fieldset: {
                      borderColor: "#8C57FF",
                      borderRadius: "10px",
                    },
                  }}
                  disabled={disabled}
                />
                <div hidden={disabled} style={{ alignSelf: "end" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      borderRadius: "10px",
                      width: "120px",
                      height: "40px",
                      mr: "10px",
                      backgroundColor: "#8C57FF",
                    }}
                  >
                    <Typography fontSize={"12px"} fontWeight={"bold"}>
                      {action}
                    </Typography>
                  </Button>
                </div>
              </Box>
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CRUDDialog;
