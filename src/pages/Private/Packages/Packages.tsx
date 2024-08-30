import {
  Box,
  // Checkbox,
  // CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
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
// import PrintIcon from "@mui/icons-material/Print";
import { useState } from "react";
// import SelectFilter from "../../../components/Select/SelectFilter";
// import useAxios from "../../../hooks/useAxios";
import RowActionButton from "../../../components/Buttons/RowActionButton";
import EditIcon from "@mui/icons-material/Edit";
// import Swal from "sweetalert2";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import CRUDDialog from "./components/CRUDDialog";

const Packages = () => {
  const [page, _setPage] = useState(1);
  const [_rowsPerPage, _setRowsPerPage] = useState(6);
  const [hasNextPage, _setHasNextPage] = useState<boolean>(true);
  const [hasPrevPage, _setHasPrevPage] = useState<boolean>(true);
  const [totalPages, _setTotalPages] = useState<number>(0);

  const [transactions, _setTransactions] = useState<any[]>([]);
  const [_selectedData, setSelectedData] = useState<any>();
  const [_openCRUDDialog, setOpenCRUDDialog] = useState(false);
  const [_action, setAction] = useState("");
  const [_refresh, _setRefresh] = useState<boolean>(false);

  // const [year, setYear] = useState("2023");
  // const [month, setMonth] = useState("January");
  // const [day, setDay] = useState("Week 1");

  // const [allCheck, setAllCheck] = useState<boolean>(false);
  // const [searchWord, _setSearchWord] = useState<string>("");

  const tableCols = [
    "Package Number",
    "Package Name",
    "Services Used",
    "Branch",
    "Price",
    "Description",
  ];

  const btnClick = (action: string, transaction?: any) => {
    setAction(action);
    setSelectedData(transaction);
    setOpenCRUDDialog(true);
  };

  const rowActions = (transaction: any) => {
    return (
      <>
        <TableCell key={transaction.id}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <RowActionButton
              color="blue"
              icon={<AddCircleOutlineIcon />}
              onClick={() => btnClick("View", transaction)}
              title="View"
            />
            <RowActionButton
              color="green"
              icon={<EditIcon />}
              onClick={() => btnClick("Edit", transaction)}
              title="Edit"
            />
            {/* <RowActionButton color="orange" icon={<PrintIcon/>} onClick={() => btnClick('Print', product)} title="Print" /> */}
            <RowActionButton
              color="red"
              icon={<DeleteIcon />}
              onClick={() => btnClick("Delete", transaction)}
              title="Delete"
            />
          </Box>
        </TableCell>
      </>
    );
  };

  return (
    <>
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ ml: "50px", mb: "20px" }}
      >
        Packages
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
          gap: 2,
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
          <SearchTextField
            placeholder="Search Packages..."
            size="small"
            // value={searchWord}
            // onChange={(e: any) => searchItems(e.target.value)}
            sx={{
              width: "50%",
            }}
          />
          <ActionButton
            color="primary"
            icon={<AddCircleOutlineIcon />}
            text="Add"
            onClick={() => btnClick("Add")}
          />
          {/* <ActionButton color="error" icon={<DeleteIcon />} text="Delete" /> */}
          {/* <ActionButton color="warning" icon={<PrintIcon />} text="Print" /> */}
        </Box>
        {/* <Box
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
        </Box> */}

        <TableContainer sx={{ flexGrow: 1 }}>
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
              <TableRow>
                {tableCols.map((col, index) => (
                  <TableCell
                    key={index}
                    size="small"
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#F5F5F5",
                      padding: "15px",
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((item) => (
                <TableRow key={item.id}>
                  {/* <TableCell>
                      <Checkbox
                        checked={item.isChecked ?? false}
                        onChange={() => itemCheck(item)}
                        sx={{
                          color: "#7DAFDB",
                        }}
                      />
                    </TableCell> */}
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.total_sales_amount}</TableCell>
                  <TableCell>{item.total_cash_received}</TableCell>
                  <TableCell>{item.change}</TableCell>
                  {rowActions(item)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            size="medium"
            disabled={!hasPrevPage}
            // onClick={() => changePage("Prev")}
          >
            <NavigateBeforeIcon />
          </IconButton>
          {page + " of " + totalPages}
          <IconButton
            size="medium"
            disabled={!hasNextPage}
            // onClick={() => changePage("Next")}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Paper>
    </>
  );
};

export default Packages;
