import { forwardRef, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CRUDDialogHeader from "../../../../components/Dialogs/CRUDDialogHeader";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";
import { TransitionProps } from "@mui/material/transitions";
import RowActionButton from "../../../../components/Buttons/RowActionButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemType from "../../../../types/Item";
import ServiceType from "../../../../types/Service";

type ItemsDialog = {
  open: boolean;
  onClose: () => void;
  // Create Service props related
  // items?: ItemType[];
  // setItems?: (data: ItemType[], action: string) => void;
  service?: ServiceType;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ItemsDialog = (props: ItemsDialog) => {
  const { open, onClose, service } = props;

  const { loading: getLoading, callApi: getData } = useAxios({
    method: "get",
    url: "services",
    immediate: false,
    onSuccess(data) {
      if (data != undefined) {
        let temp = data.data.items;

        let temp_items: ItemType[] = [];

        temp.map((item: any) => {
          let i: ItemType = {
            id: item.id,
            name: item.name,
            description: item.description,
            brand_id: item.brand_id,
            type_id: item.type_id,
          };
          temp_items.push(i);

          setIDs((prev) => {
            const next = new Set(prev);
            next.add(i.id ?? "");

            return next;
          });
        });

        setData(temp_items);
      }
    },
  });

  const { loading: _getItemsLoading, callApi: getLoadedtems } = useAxios({
    method: "get",
    url: "items",
    immediate: false,
    onSuccess(data) {
      if (data != undefined) {
        setLoadedItems(data?.data.data);
      }
    },
  });

  // if item doesnt exist already it adds, otherwise it deletes
  const { callApi: addRemoveItem } = useAxios({
    method: "post",
    url: "services",
    immediate: false,
    onSuccess(resData) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Saved",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        if (selectedData != undefined) {
          setData((x) => [...x, selectedData]);
          setIDs((prev) => {
            const next = new Set(prev);
            next.add(selectedData.id ?? "");

            return next;
          });

          setSelectedData(undefined);
        } else {
          let temp: ItemType[] = data.reduce((arr: ItemType[], item) => {
            if (resData.payload.item_id != item.id) {
              arr.push(item);
            }

            return arr;
          }, []);
          setData(temp);

          setIDs((prev) => {
            const next = new Set(prev);
            next.delete(resData.payload.item_id ?? "");

            return next;
          });
        }
      });
    },
  });

  const [searchWord, setSearchWord] = useState<string>("");
  const [_page, setPage] = useState(1);
  const [rowsPerPage, _setRowsPerPage] = useState(6);

  const [data, setData] = useState<ItemType[]>([]);
  const [ids, setIDs] = useState(new Set<string>());
  const [loadedItems, setLoadedItems] = useState<ItemType[]>([]);
  const [selectedData, setSelectedData] = useState<ItemType>();

  const tableCols = ["Item Name", "Description", "Action"];

  const handleClose = () => {
    onClose();
  };

  const onAddRemoveItem = (data?: ItemType) => {
    if (selectedData != undefined) {
      if (!ids.has(selectedData.id ?? "")) {
        Swal.fire({
          icon: "question",
          title: "Confirm",
          text: "Proceed with save?",
          showConfirmButton: true,
        }).then((res) => {
          if (res.isConfirmed)
            addRemoveItem({
              origin: "Service Items",
              id: service?.id,
              item_id: selectedData.id,
            });
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Item already exists.",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          setSelectedData(undefined);
          setLoadedItems([]);
        });
      }
    } else if (data != undefined) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Delete this item from service?",
        showConfirmButton: true,
      }).then((res) => {
        if (res.isConfirmed)
          addRemoveItem({
            origin: "Service Items",
            id: service?.id,
            item_id: data.id,
          });
      });
    }
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
    getLoadedtems({
      search: x,
      page: 1,
      size: rowsPerPage,
      orderBy: { name: "ASC" },
    });
  });

  useEffect(() => {
    if (service?.id != undefined && service.id != "")
      getData({ id: service.id });
  }, [open]);

  return (
    <>
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
        maxWidth="md"
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
            action={service?.name ?? ""}
            module="Items"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              padding: 2,
              width: "100%",
              alignItems: "center",
              // alignSelf: "center",
              height: "100vh",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={10} lg={10}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={loadedItems ?? []}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  noOptionsText={
                    searchWord.length > 0 && loadedItems.length === 0
                      ? "Item doesn't exist"
                      : "Search for Items"
                  }
                  value={
                    selectedData
                      ? selectedData
                      : {
                          id: "",
                          name: "",
                          description: "",
                          brand_id: "",
                          type_id: "",
                        }
                  }
                  onChange={(_event, newValue, reason) => {
                    if (newValue != null) {
                      setSelectedData(newValue);
                      // setSelectedCustomer(newValue);
                    } else if (reason === "clear") setLoadedItems([]);
                  }}
                  fullWidth={true}
                  size="small"
                  // disabled={disabled}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Items"
                      value={searchWord}
                      onChange={(e) => searchItems(e.target.value)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <Button
                  sx={{
                    alignSelf: "end",
                    background: "#8C57FF",
                    borderRadius: "10px",
                    height: "40px",
                  }}
                  onClick={() => onAddRemoveItem()}
                  variant="contained"
                >
                  <Typography fontSize={20}>+</Typography>
                </Button>
              </Grid>
            </Grid>
            {getLoading ? (
              <CircularProgress />
            ) : (
              <TableContainer>
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
                    {data
                      ? data.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell align="center">{item.name}</TableCell>
                            <TableCell align="center">
                              {item.description}
                            </TableCell>
                            <TableCell align="center">
                              <RowActionButton
                                color="red"
                                icon={<DeleteIcon />}
                                onClick={() => onAddRemoveItem(item)}
                                title="Remove Item"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ItemsDialog;
