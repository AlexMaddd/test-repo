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
import VehicleType from "../../../../types/Vehicle";
import CustomerType from "../../../../types/Customer";
import { Autocomplete } from "@mui/material";

type CRUDDialog = {
  open: boolean;
  onClose: () => void;
  action: string;
  selectedData?: VehicleType; //any | null;
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

  const { callApi: getCustomers } = useAxios({
    method: "get",
    url: "customers",
    immediate: false,
    onSuccess(data) {
      if (data != undefined) setCustomers(data.data.data);
    },
  });

  const { callApi: saveData } = useAxios({
    method: action === "Add" ? "post" : "put",
    url: "vehicles",
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

  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [owner, setOwner] = useState<CustomerType>({
    id: "",
    fname: "",
    mname: "",
    lname: "",
    email: "",
    contact_number: "",
  });
  const [searchWord, setSearchWord] = useState<string>("");
  const [_page, setPage] = useState(1);
  const [rowsPerPage, _setRowsPerPage] = useState(6);

  const handleClose = () => {
    setCustomers([]);
    refresh();
    onClose();
  };

  const debounce = (fn: Function, ms = 1000) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const searchItems = debounce((x: string) => {
    setSearchWord(x);
    setPage(1);
    getCustomers({
      search: x,
      page: 1,
      size: rowsPerPage,
      orderBy: { lname: "ASC" },
    });
  });

  const save = (values: VehicleType) => {
    if (values?.customer_id !== undefined) {
      // Avoids changing values of form
      let data: VehicleType = {
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
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Select customer",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  useEffect(() => {
    if (action === "View") setDisabled(true);

    if (action != "Add")
      setOwner(
        selectedData?.customer
          ? selectedData?.customer
          : {
              id: "",
              fname: "",
              mname: "",
              lname: "",
              email: "",
              contact_number: "",
            }
      );

    return () => {
      setDisabled(false);
      setOwner({
        id: "",
        fname: "",
        mname: "",
        lname: "",
        email: "",
        contact_number: "",
      });
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
          module="Vehicles"
        />
        <Formik
          initialValues={{
            maker: selectedData?.maker ? selectedData.maker : "",
            model: selectedData?.model ? selectedData.model : "",
            plate_number: selectedData?.plate_number
              ? selectedData.plate_number
              : "",
            customer_id: selectedData?.customer_id
              ? selectedData.customer_id
              : "",
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
                  name="maker"
                  label="Maker"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  value={values.maker}
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
                  name="model"
                  label="Model"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  value={values.model}
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
                  name="plate_number"
                  label="Plate Number"
                  variant="outlined"
                  size="small"
                  fullWidth={true}
                  value={values.plate_number}
                  onChange={handleChange}
                  sx={{
                    fieldset: {
                      borderColor: "#8C57FF",
                      borderRadius: "10px",
                    },
                  }}
                  disabled={disabled}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={customers ?? []}
                  getOptionKey={(option) => option.id ?? ""}
                  getOptionLabel={(option) =>
                    option.id != ""
                      ? `${option.lname}, ${option.fname} ${option.mname}`
                      : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  noOptionsText={
                    searchWord.length > 0 && customers.length === 0
                      ? "Customer doesn't exist"
                      : "Search for customer"
                  }
                  value={owner}
                  onChange={(_event, newValue, reason) => {
                    if (newValue != null) {
                      setFieldValue("customer_id", newValue.id);
                      setOwner(newValue);
                    } else if (reason === "clear") setCustomers([]);
                  }}
                  fullWidth={true}
                  size="small"
                  disabled={disabled}
                  ListboxProps={{ style: { maxHeight: "6rem" } }}
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
                    <TextField
                      {...params}
                      label="Owner"
                      value={searchWord}
                      onChange={(e) => searchItems(e.target.value)}
                    />
                  )}
                />
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
