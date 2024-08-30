import { Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import { ReactNode } from "react";

const ActionButton = (props: any) => {
  const icon = (): ReactNode => {
    return props.icon === "Add" ? (
      <AddIcon />
    ) : props.icon === "Employee" ? (
      <PeopleIcon />
    ) : (
      props.icon
    );
  };

  return (
    <Tooltip title={props.title} placement="top">
      <Button
        variant="outlined"
        content="AAAAA"
        size="medium"
        color={props.color}
        sx={{
          // ...props.sx
          borderRadius: "10px",
        }}
        onClick={props.onClick}
      >
        {icon()}
      </Button>
    </Tooltip>
  );
};

export default ActionButton;
