import {
  Box,
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
import { Suspense, lazy, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import RowActionButton from "../../../components/Buttons/RowActionButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Swal from "sweetalert2";
import VehicleType from "../../../types/Vehicle";

const CRUDDialog = lazy(() => import("./components/CRUDDialog"));

const Vehicles = () => {
  const {
    error,
    callApi: getData,
    loading,
  } = useAxios({
    method: "get",
    url: "vehicles",
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

  const { callApi: deleteData } = useAxios({
    method: "delete",
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

  const [data, setData] = useState<VehicleType[]>([]);
  const [selectedData, setSelectedData] = useState<VehicleType>();
  const [openCRUDDialog, setOpenCRUDDialog] = useState(false);
  const [action, setAction] = useState("");
  const [refresh, setRefresh] = useState(true);

  // const [year, setYear] = useState("2023");
  // const [month, setMonth] = useState("January");
  // const [day, setDay] = useState("Week 1");

  // const years = ["2023", "2022", "2021"];
  // const months = ["January", "February", "March"];
  // const days = ["Week 1", "Week 2", "Week 3"];

  // const [allCheck, setAllCheck] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState("");

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stocks.length) : 0;

  // const handleChangePage = (
  //   _event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const headerCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAllCheck(event.target.checked);

  //   let newState: DashboardType[] = stocks.reduce(
  //     (arr: DashboardType[], stock) => {
  //       stock.isChecked = event.target.checked;
  //       arr.push(stock);

  //       return arr;
  //     },
  //     []
  //   );

  //   setStocks(newState);
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
      orderBy: { maker: "ASC", model: "ASC" },
    });
  });

  // const itemCheck = (product: DashboardType) => {
  //   let newState: DashboardType[] = stocks.reduce(
  //     (arr: DashboardType[], item) => {
  //       if (item.id == product.id) {
  //         item.isChecked = !item.isChecked;
  //       }
  //       arr.push(item);

  //       return arr;
  //     },
  //     []
  //   );

  //   setStocks(newState);
  // };

  const tableCols = ["Maker", "Model", "Plate Number", "Owner", "Actions"];

  const rowActions = (item: VehicleType) => {
    return (
      <>
        <TableCell align="center" key={item.id}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
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

  const btnClick = (action: string, item?: VehicleType) => {
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
      setOpenCRUDDialog(true);
    }
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
      orderBy: { maker: "ASC", model: "ASC" },
    });
  }, []);

  useEffect(() => {
    getData({
      search: searchWord,
      page: page,
      size: rowsPerPage,
      orderBy: { maker: "ASC", model: "ASC" },
    });
  }, [page]);

  useEffect(() => {
    if (refresh == true) {
      getData({
        search: searchWord,
        page: page,
        size: 6,
        orderBy: { maker: "ASC", model: "ASC" },
      });
      setRefresh(false);
    }
  }, [refresh]);

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
      </Suspense>

      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ ml: "50px", mb: "20px" }}
      >
        Vehicles
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
          gap: 3,
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
            placeholder="Search  Vehicles..."
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
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
              onChange={(e: any) => setYear(e.target.value)}
            />
            <SelectFilter
              value={month}
              items={months.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
              onChange={(e: any) => setMonth(e.target.value)}
            />
            <SelectFilter
              value={day}
              items={days.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
              onChange={(e: any) => setDay(e.target.value)}
            />
          </Box> */}
        {loading ? (
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
              <TableHead>
                <TableRow>
                  {tableCols.map((col, index) => (
                    <TableCell
                      key={index}
                      size="small"
                      align="center"
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
                    <TableCell align="center">{item.maker}</TableCell>
                    <TableCell align="center">{item.model}</TableCell>
                    <TableCell align="center">{item.plate_number}</TableCell>
                    <TableCell align="center">{item.owner}</TableCell>
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
          {/* <TablePagination
              component="div"
              rowsPerPageOptions={[3, 6, 9]}
              count={units.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
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

export default Vehicles;
