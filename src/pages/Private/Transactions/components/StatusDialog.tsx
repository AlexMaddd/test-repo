import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import CRUDDialogHeader from "../../../../components/Dialogs/CRUDDialogHeader";
import TransactionType from "../../../../types/Transaction";
import Swal from "sweetalert2";
import useAxios from "../../../../hooks/useAxios";

type Dialog = {
  open: boolean;
  onClose: () => void;
  type: string;
  transaction?: TransactionType;
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

const StatusDialog = (props: Dialog) => {
  const { open, onClose, type, transaction, refresh } = props;

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
        refresh();
        onClose();
      });
    },
  });

  const [initialStatus, setInitialStatus] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const status =
    type === "Transaction Status"
      ? ["Approved", "Cancelled", "Paid"]
      : ["Pending", "Servicing", "Completed", "Released"];

  const handleChangeStatus = (value: string) => {
    if (type === "Work Status") {
      let current_index = status.indexOf(initialStatus);
      let value_index = status.indexOf(value);

      if (
        (current_index <= value_index &&
          Math.abs(current_index - value_index) === 1) ||
        current_index === value_index
      ) {
        setSelectedStatus(value);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid status",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } else setSelectedStatus(value);
  };

  const save = () => {
    if (selectedStatus != "") {
      let data: any = {};

      data.origin =
        type === "Transaction Status" ? "Transaction Status" : "Work Status";
      data.id = transaction?.id;

      type === "Transaction Status"
        ? (data.transaction_status = selectedStatus.toLowerCase())
        : (data.work_status = selectedStatus.toLowerCase());

      Swal.fire({
        icon: "question",
        title: "Confirm",
        text: "Proceed with save?",
        showConfirmButton: true,
      }).then((res) => {
        if (res.isConfirmed) saveData(data);
      });
    }
  };

  useEffect(() => {
    if (open) {
      type === "Transaction Status"
        ? setSelectedStatus(
            transaction?.transaction_status?.charAt(0).toUpperCase() +
              (transaction?.transaction_status ?? "").slice(1) ?? ""
          )
        : setSelectedStatus(
            transaction?.work_status?.charAt(0).toUpperCase() +
              (transaction?.work_status ?? "").slice(1) ?? ""
          );
    }
    return () => {
      setInitialStatus("");
      setSelectedStatus("");
    };
  }, [open]);

  useEffect(() => {
    if (initialStatus === "") setInitialStatus(selectedStatus);
  }, [selectedStatus]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          handleClose={onClose}
          action={"Update"}
          module={`${type}`}
        />
        {/* <Autocomplete
          options={status}
          fullWidth
          size="small"
          onChange={(_e, value) =>
            setSelectedStatus(value?.toLowerCase() ?? "")
          }
          renderInput={(params) => <TextField {...params} label="Status" />}
        /> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedStatus}
            label="Age"
            onChange={(e) => handleChangeStatus(e.target.value)}
          >
            {status.map((status, i) => (
              <MenuItem key={i} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{
            borderRadius: "10px",
            width: "120px",
            height: "40px",
            mt: "10px",
            backgroundColor: "#8C57FF",
            alignSelf: "end",
          }}
          onClick={() => save()}
        >
          <Typography fontSize={"12px"} fontWeight={"bold"}>
            Update
          </Typography>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default StatusDialog;
