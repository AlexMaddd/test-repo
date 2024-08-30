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
import ItemType from "../../../../types/Item";
import BrandType from "../../../../types/Brand";
import TypeType from "../../../../types/Types";
import { Autocomplete, CircularProgress } from "@mui/material";

type CRUDDialog = {
  open: boolean;
  onClose: () => void;
  action: string;
  selectedData?: ItemType; //any | null;
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

  const defaultBrand: BrandType = {
    id: "",
    name: "",
    description: "",
  };

  const defaultType: TypeType = {
    id: "",
    name: "",
    description: "",
  };

  const { callApi: saveData } = useAxios({
    method: action === "Add" ? "post" : "put",
    url: "items",
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

  const { loading: loadingBrands, callApi: getBrands } = useAxios({
    method: "get",
    url: "brands/all",
    immediate: false,
    onSuccess(data) {
      let temp: any[] = data.data;
      temp.splice(0, 0, defaultBrand);
      setBrands(temp);
    },
  });

  const { loading: loadingTypes, callApi: getTypes } = useAxios({
    method: "get",
    url: "types/all",
    immediate: false,
    onSuccess(data) {
      let temp: any[] = data.data;
      temp.splice(0, 0, defaultType);
      setTypes(temp);
    },
  });

  const [brands, setBrands] = useState<BrandType[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<BrandType>(defaultBrand);
  const [types, setTypes] = useState<TypeType[]>([]);
  const [selectedType, setSelectedType] = useState<TypeType>(defaultType);
  const [disabled, setDisabled] = useState(false);

  const handleClose = () => {
    refresh();
    onClose();
  };

  const save = (values: ItemType) => {
    // Avoids changing values of form
    let data: ItemType = {
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
    if (selectedData?.brand_id != null)
      setSelectedBrand(selectedData.brand ?? defaultBrand);
    if (selectedData?.type_id != null)
      setSelectedType(selectedData.type ?? defaultType);

    if (action === "View") setDisabled(true);
    else {
      getBrands();
      getTypes();
    }

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
          module="Item"
        />
        <Formik
          initialValues={{
            name: selectedData?.name ? selectedData.name : "",
            description: selectedData?.description
              ? selectedData.description
              : "",
            brand_id: selectedData?.brand_id ? selectedData.brand_id : "",
            type_id: selectedData?.type_id ? selectedData.type_id : "",
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
                {loadingBrands ? (
                  <CircularProgress />
                ) : (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    disabled={disabled}
                    options={brands ?? []}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    noOptionsText={"Brand doesn't exist"}
                    value={selectedBrand}
                    onChange={(_event, newValue) => {
                      if (newValue != null) {
                        setFieldValue("brand_id", newValue.id);
                        setSelectedBrand(newValue);
                      }
                    }}
                    fullWidth={true}
                    size="small"
                    // disabled={disabled}
                    renderInput={(params) => (
                      <TextField {...params} label="Brands" />
                    )}
                  />
                )}
                {loadingTypes ? (
                  <CircularProgress />
                ) : (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    disabled={disabled}
                    options={types ?? []}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    noOptionsText={"Type doesn't exist"}
                    value={selectedType}
                    onChange={(_event, newValue) => {
                      if (newValue != null) {
                        setFieldValue("type_id", newValue.id);
                        setSelectedType(newValue);
                      }
                    }}
                    fullWidth={true}
                    size="small"
                    // disabled={disabled}
                    renderInput={(params) => (
                      <TextField {...params} label="Types" />
                    )}
                  />
                )}

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
  );
};

export default CRUDDialog;
