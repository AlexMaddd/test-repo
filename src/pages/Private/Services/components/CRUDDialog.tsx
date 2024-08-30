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
import ServiceType from "../../../../types/Service";
import { Checkbox, FormControlLabel } from "@mui/material";
// import ItemType from "../../../../types/Item";
// import ItemsDialog from "./ItemsDialog";

type CRUDDialog = {
  open: boolean;
  onClose: () => void;
  action: string;
  selectedData?: ServiceType; //any | null;
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
    url: "services",
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

  // const [openDialog, setOpenDialog] = useState<boolean>(false);
  // const [items, setItems] = useState<ItemType[]>([]);
  const [disabled, setDisabled] = useState(false);

  const handleClose = () => {
    refresh();
    onClose();
  };

  const save = (values: ServiceType) => {
    // Avoids changing values of form
    let data: ServiceType = {
      ...values,
    };

    data.is_package = data.is_package === true ? 1 : 0;
    data.is_parent = data.is_parent === true ? 1 : 0;

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

  // const setServiceItems = (data: ItemType[], action: string) => {
  //   setItems(data);
  // };

  useEffect(() => {
    if (action === "View") setDisabled(true);

    return () => {
      setDisabled(false);
    };
  }, [open]);

  return (
    <>
      {/* <Suspense fallback={<CircularProgress />}>
        <ItemsDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          items={items}
          setItems={setServiceItems}
        />
      </Suspense> */}
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
            module="Service"
          />
          <Formik
            initialValues={{
              name: selectedData?.name ? selectedData.name : "",
              description: selectedData?.description
                ? selectedData.description
                : "",
              is_package: selectedData?.is_package
                ? selectedData.is_package === 1
                  ? true
                  : false
                : false,
              is_parent: selectedData?.is_parent
                ? selectedData.is_parent === 1
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
                    name="name"
                    label="Name"
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
                  <Box>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          color="primary"
                          checked={values.is_package}
                          onChange={(e) => {
                            setFieldValue("is_package", e.target.checked);
                          }}
                          sx={{
                            "&.Mui-checked": {
                              color: "#8C57FF",
                            },
                          }}
                          disabled={disabled}
                        />
                      }
                      label="is Package"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          color="primary"
                          checked={values.is_parent}
                          onChange={(e) => {
                            setFieldValue("is_parent", e.target.checked);
                          }}
                          sx={{
                            "&.Mui-checked": {
                              color: "#8C57FF",
                            },
                          }}
                          disabled={disabled}
                        />
                      }
                      label="is Parent"
                      labelPlacement="start"
                    />
                  </Box>

                  {disabled ? null : (
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
                  )}
                </Box>
              </>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CRUDDialog;
