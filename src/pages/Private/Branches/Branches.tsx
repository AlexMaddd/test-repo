import {
  Box,
  // Checkbox,
  CircularProgress,
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
// import PrintIcon from "@mui/icons-material/Print";
import { Suspense, lazy, useEffect, useState } from "react";
// import SelectFilter from "../../../components/Select/SelectFilter";
import useAxios from "../../../hooks/useAxios";
import RowActionButton from "../../../components/Buttons/RowActionButton";
import Swal from "sweetalert2";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import BranchType from "../../../types/Branch";
import EmployeesDialog from "./components/EmployeesDialog";

const CRUDDialog = lazy(() => import("./components/CRUDDialog"));

const Transactions = () => {
  const {
    error,
    loading: getLoading,
    callApi: getData,
  } = useAxios({
    method: "get",
    url: "branches",
    immediate: false,
    onSuccess(data) {
      if (data != undefined) {
        setData(data?.data.data);
        data?.data.next_page_url == null
          ? setHasNextPage(false)
          : setHasNextPage(true);
        data?.data.prev_page_url == null
          ? setHasPrevPage(false)
          : setHasPrevPage(true);

        let noOfPages = data?.data.links.length;

        setTotalPages(noOfPages - 2);
      }
    },
  });

  const { callApi: deleteData, loading: deleteLoading } = useAxios({
    method: "delete",
    url: "branches",
    immediate: false,
    onSuccess() {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Saved",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        setRefresh(true);
      });
    },
  });

  const [page, setPage] = useState(1);
  const [rowsPerPage, _setRowsPerPage] = useState(6);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [hasPrevPage, setHasPrevPage] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [_currentPage, setCurrentPage] = useState("");

  const [data, setData] = useState<BranchType[]>([]);
  const [selectedData, setSelectedData] = useState<BranchType>();
  const [openCRUDDialog, setOpenCRUDDialog] = useState(false);
  const [openEmployeesDialog, setOpenEmployeesDialog] =
    useState<boolean>(false);
  const [action, setAction] = useState("");
  const [refresh, setRefresh] = useState<boolean>(false);

  // const [year, setYear] = useState("2023");
  // const [month, setMonth] = useState("January");
  // const [day, setDay] = useState("Week 1");

  // const [allCheck, setAllCheck] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");

  // const years = ["2023", "2022", "2021"];
  // const months = ["January", "February", "March"];
  // const days = ["Week 1", "Week 2", "Week 3"];

  // const headerCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAllCheck(event.target.checked);

  //   let newState: TransactionType[] = transactions.reduce(
  //     (arr: TransactionType[], item) => {
  //       item.isChecked = event.target.checked;
  //       arr.push(item);

  //       return arr;
  //     },
  //     []
  //   );

  //   setTransactions(newState);
  // };

  const tableCols = ["Name", "Address", "Actions"];

  // const itemCheck = (product: TransactionType) => {
  //   let newState: TransactionType[] = transactions.reduce(
  //     (arr: TransactionType[], item) => {
  //       if (item.id == product.id) {
  //         item.isChecked = !item.isChecked;
  //       }
  //       arr.push(item);

  //       return arr;
  //     },
  //     []
  //   );

  //   setTransactions(newState);
  // };

  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const searchItems = debounce((x: string) => {
    setSearchWord(x);
    setPage(1);
    getData({
      search: x,
      page: 1,
      size: rowsPerPage,
      orderBy: { name: "ASC" },
    });
  });

  const btnClick = (action: string, item?: BranchType) => {
    if (action == "Delete") {
      Swal.fire({
        icon: "warning",
        title: "Confirm",
        text: "Proceed with delete?",
      }).then((res) => {
        if (res.isConfirmed) deleteData({ id: item?.id });
      });
    } else {
      setAction(action);
      setSelectedData(item);

      action === "Employees"
        ? setOpenEmployeesDialog(true)
        : setOpenCRUDDialog(true);
    }
  };

  const rowActions = (item: BranchType) => {
    return (
      <>
        <TableCell key={item.id}>
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
            {/* <RowActionButton
              color="purple"
              icon={<PeopleIcon />}
              onClick={() => btnClick("Employees", item)}
              title="Employees"
            /> */}
            <RowActionButton
              color="blue"
              icon={"View"}
              onClick={() => btnClick("View", item)}
              title="View"
            />
            <RowActionButton
              color="green"
              icon={"Edit"}
              onClick={() => btnClick("Edit", item)}
              title="Edit"
            />
            {/* <RowActionButton color="orange" icon={<PrintIcon/>} onClick={() => btnClick('Print', product)} title="Print" /> */}
            <RowActionButton
              color="red"
              icon={"Delete"}
              onClick={() => btnClick("Delete", item)}
              title="Delete"
            />
          </Box>
        </TableCell>
      </>
    );
  };

  const changePage = (action: string) => {
    if (action == "Next") setPage((x) => x + 1);
    else setPage((x) => x - 1);
  };

  useEffect(() => {
    let path: string[] = location.pathname.split("/");
    let splitPath = path[path.length - 1].split("-");
    let currPage = "";

    splitPath.map((word) => {
      let arr = word.split("");
      arr[0] = arr[0].toUpperCase();
      let text = arr.toString().replace(/,/g, "");
      currPage += text + " ";
    });

    setCurrentPage(currPage);
    getData({
      search: "",
      page: page,
      size: rowsPerPage,
      orderBy: { name: "ASC" },
    });
  }, []);

  useEffect(() => {
    getData({
      search: searchWord,
      page: page,
      size: rowsPerPage,
      orderBy: { name: "ASC" },
    });
  }, [page]);

  useEffect(() => {
    if (error.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (refresh == true) {
      getData({
        search: "",
        page: page,
        size: rowsPerPage,
        orderBy: { name: "ASC" },
      });
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (openCRUDDialog == false && selectedData != undefined)
      setSelectedData(undefined);
  }, [openCRUDDialog]);

  return (
    <>
      <Suspense fallback={<CircularProgress />}>
        <CRUDDialog
          open={openCRUDDialog}
          onClose={() => setOpenCRUDDialog(false)}
          action={action}
          selectedData={selectedData}
          refresh={() => setRefresh(true)}
        />
        <EmployeesDialog
          open={openEmployeesDialog}
          onClose={() => setOpenEmployeesDialog(false)}
        />
      </Suspense>

      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ ml: "50px", mb: "20px" }}
      >
        Branches
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
            placeholder="Search Branches..."
            size="small"
            // value={searchWord}
            onChange={(e: any) => searchItems(e.target.value)}
            sx={{
              width: "50%",
            }}
          />
          <ActionButton
            color="primary"
            icon={"Add"}
            title="Add"
            onClick={() => btnClick("Add")}
          />
          <ActionButton
            color="secondary"
            icon={"Employee"}
            title="Add Employee"
            onClick={() => btnClick("Employees")}
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
        {getLoading && deleteLoading ? (
          <Box
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
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
                      align="center"
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
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
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.address}</TableCell>
                    {rowActions(item)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
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
            onClick={() => changePage("Prev")}
          >
            <NavigateBeforeIcon />
          </IconButton>
          {page + " of " + totalPages}
          <IconButton
            size="medium"
            disabled={!hasNextPage}
            onClick={() => changePage("Next")}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Paper>
    </>
  );
};

export default Transactions;
