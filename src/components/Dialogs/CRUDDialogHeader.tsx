import { Box, Divider, IconButton, Typography } from "@mui/material";
import { format } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";

type CRUDDialogHeaderProps = {
  handleClose: () => void;
  action: string;
  module: string;
  date?: string;
};

const CRUDDialogHeader = (props: CRUDDialogHeaderProps) => {
  const { handleClose, action, module, date } = props;
  return (
    <>
      <IconButton
        size="small"
        sx={{ alignSelf: "end" }}
        onClick={() => handleClose()}
      >
        <CloseIcon style={{ fill: "#555555" }} />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          alignSelf: "center",
          gap: 1,
        }}
      >
        <Typography variant="h5">
          {action} {module}
        </Typography>
        <Divider
          variant="middle"
          sx={{ width: "100%", marginTop: "15px", marginBottom: "10px" }}
        />
        <Typography fontWeight="bold">
          {action != "Add" ? date : format(new Date(), "MMMM-d-yyyy")}
        </Typography>
      </Box>
    </>
  );
};
export default CRUDDialogHeader;
