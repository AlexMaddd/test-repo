import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IsoIcon from "@mui/icons-material/Iso";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ConstructionIcon from "@mui/icons-material/Construction";
import { ReactNode } from "react";

const RowActionButton = (props: any) => {
  const icon = (): ReactNode => {
    return props.icon === "Edit" ? (
      <EditIcon />
    ) : props.icon === "View" ? (
      <VisibilityIcon />
    ) : props.icon === "Delete" ? (
      <DeleteIcon />
    ) : props.icon === "Service Items" ? (
      <IsoIcon />
    ) : props.icon === "Employee" ? (
      <PeopleIcon />
    ) : props.icon === "Transaction Status" ? (
      <ReceiptIcon />
    ) : props.icon === "Work Status" ? (
      <ConstructionIcon />
    ) : (
      props.icon
    );
  };

  return (
    <Tooltip title={props.title} placement="top">
      <IconButton
        sx={{
          border: "solid 1px",
          color: props.color,
        }}
        size="small"
        onClick={props.onClick}
      >
        {icon()}
      </IconButton>
    </Tooltip>
  );
};

export default RowActionButton;
