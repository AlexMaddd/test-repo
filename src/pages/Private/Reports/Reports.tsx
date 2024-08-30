import {
  Box,
  MenuItem,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SearchTextField from "../../../components/TextFields/SearchTextField";
import ActionButton from "../../../components/Buttons/ActionButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import { useState } from "react";
import SelectFilter from "../../../components/Select/SelectFilter";
import CRUDDialog from "./components/CRUDDialog";

const Reports = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState("");

  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("January");
  const [day, setDay] = useState("Week 1");

  const years = ["2023", "2022", "2021"];
  const months = ["January", "February", "March"];
  const days = ["Week 1", "Week 2", "Week 3"];
  const tableCols = [
    "Report Number",
    "Services Used",
    "Employees",
    "Price",
    "Description",
  ];

  const btnClick = (action: string) => {
    setOpenDialog(true);
    setAction(action);
  };

  return (
    <>
      <CRUDDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        action={action}
      />
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ ml: "50px", mb: "20px" }}
      >
        Reports
      </Typography>
      <Paper
        elevation={24}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: "700px",
          borderRadius: "20px",
          p: "30px",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 1,
          }}
        >
          <SearchTextField placeholder="Search Reports..." size="small" />
          <ActionButton
            color="primary"
            icon={<AddCircleOutlineIcon />}
            onClick={() => btnClick("Add")}
            text="Add"
          />
          <ActionButton color="error" icon={<DeleteIcon />} text="Delete" />
          <ActionButton color="warning" icon={<PrintIcon />} text="Print" />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 1,
          }}
        >
          <SelectFilter
            value={year}
            items={years.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
            onChange={(e: any) => setYear(e.target.value)}
          />
          <SelectFilter
            value={month}
            items={months.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
            onChange={(e: any) => setMonth(e.target.value)}
          />
          <SelectFilter
            value={day}
            items={days.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
            onChange={(e: any) => setDay(e.target.value)}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
              <TableRow>
                {tableCols.map((col) => (
                  <TableCell size="small" sx={{ fontWeight: "bold" }}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Reports;
