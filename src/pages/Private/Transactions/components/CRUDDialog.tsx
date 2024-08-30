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
import CustomerType from "../../../../types/Customer";
import {
  Autocomplete,
  Backdrop,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import TransactionType from "../../../../types/Transaction";
import ItemType from "../../../../types/Item";
import ServiceType from "../../../../types/Service";
import RowActionButton from "../../../../components/Buttons/RowActionButton";

type CRUDDialog = {
  open: boolean;
  onClose: () => void;
  action: string;
  selectedData?: TransactionType; //any | null;
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

  const defaultCustomer: CustomerType = {
    id: "",
    fname: "",
    mname: "",
    lname: "",
    email: "",
    contact_number: "",
  };

  const defaultItem: ItemType = {
    id: "",
    name: "",
    description: "",
  };

  const defaultService: ServiceType = {
    id: "",
    name: "",
    description: "",
    is_package: false,
    is_parent: false,
  };

  const { callApi: getTransaction } = useAxios({
    method: "get",
    url: "transactions",
    immediate: false,
    onSuccess(data) {
      if (data != undefined) {
        let res = data?.data;
        let tempItems: ItemType[] = [];
        let tempServices: ServiceType[] = [];
        let tempServiceItems: any[] = [];
        let tempServicesMap = new Map<string, ServiceType>();

        setCustomer(res.customer);

        res.items.map((data: any) => {
          if (data.service_id === null || data.service_id === undefined) {
            let i: ItemType = {
              id: data.item.id,
              name: data.item.name,
              description: data.item.description,
            };

            tempItems.push(i);
          } else {
            if (!tempServicesMap.has(data.service.id)) {
              let s: ServiceType = {
                id: data.service.id,
                name: data.service.name,
                description: data.service.description,
                is_package: data.service.is_package,
                is_parent: data.service.is_parent,
                parent_id: data.service.parent_id,
                items: [],
              };

              tempServicesMap.set(s.id ?? "", s);
            }
            tempServiceItems.push({
              id: data.item.id,
              name: data.item.name,
              description: data.item.description,
              service_id: data.service.id,
            });
          }
        });

        tempServiceItems.map((i: any) => {
          if (tempServicesMap.has(i.service_id)) {
            tempServicesMap.get(i.service_id)?.items?.push({
              id: i.id,
              name: i.name,
              description: i.description,
            });
          }
        });

        tempServicesMap.forEach((values: ServiceType, _key: string) => {
          tempServices.push(values);
        });

        setSelectedServices(tempServices);
        setSelectedItems(tempItems);
      }
    },
  });

  const { callApi: getCustomers } = useAxios({
    method: "get",
    url: "customers",
    immediate: false,
    onSuccess(data) {
      if (data != undefined) {
        let initialData: CustomerType = defaultCustomer;

        data.data.data.unshift(initialData);
        setCustomers(data.data.data);
      }
    },
  });

  const { callApi: getItems } = useAxios({
    method: "get",
    url: "items/all",
    immediate: false,
    onSuccess(data) {
      if (data != undefined) {
        let initialData: ItemType = {
          id: "",
          name: "",
          description: "",
        };

        data.data.unshift(initialData);

        setItems(data.data);
      }
    },
  });

  const { callApi: getServices } = useAxios({
    method: "get",
    url: "services/all",
    immediate: false,
    onSuccess(data) {
      if (data != undefined) {
        let initialData: ServiceType = {
          id: "",
          name: "",
          description: "",
          is_package: false,
          is_parent: false,
        };

        data.data.unshift(initialData);

        setServices(data.data);
      }
    },
  });

  const { backdropLoading: getServiceItemsLoading, callApi: getServiceItems } =
    useAxios({
      method: "get",
      url: "services",
      immediate: false,
      onSuccess(data) {
        if (data != undefined) {
          let items: ItemType[] = [];

          data.data.items.map((i: ItemType) => {
            items.push({
              id: i.id,
              name: i.name,
              description: i.description,
            });
          });

          service.items = items;
        }
      },
    });

  const { callApi: saveData } = useAxios({
    method: action === "Add" ? "post" : "put",
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
        handleClose();
      });
    },
  });

  const [disabled, setDisabled] = useState(false);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [customer, setCustomer] = useState<CustomerType>(defaultCustomer);

  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedItems, setSelectedItems] = useState<ItemType[]>([]);
  const [item, setItem] = useState<ItemType>(defaultItem);

  const [services, setServices] = useState<ServiceType[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [service, setService] = useState<ServiceType>(defaultService);

  const [searchWord, setSearchWord] = useState<string>("");
  const [_page, setPage] = useState(1);
  const [rowsPerPage, _setRowsPerPage] = useState(6);
  const [openLoading, setOpenLoading] = useState<boolean>(false);

  const handleClose = () => {
    setCustomers([]);
    refresh();
    onClose();
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
    getCustomers({
      search: x,
      page: 1,
      size: rowsPerPage,
      orderBy: { lname: "ASC" },
    });
  });

  const save = () => {
    if (customer.id !== undefined) {
      let transactionList: any[] = [];

      if (action === "Add") {
        selectedItems.map((data) => {
          transactionList.push({
            item_id: data.id,
          });
        });
      } else {
        selectedItems.map((data) => {
          transactionList.push({
            item_id: data.id,
            service_id: "",
          });
        });
      }

      selectedServices.map((data) => {
        data.items?.map((item) => {
          transactionList.push({
            item_id: item.id,
            service_id: data.id,
          });
        });
      });

      let data: any = {
        origin: "Transactions",
        customer_id: customer.id,
        items: transactionList,
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
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Select customer",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const addTransaction = (type: string) => {
    let err = false;

    if (type === "item") {
      if (item.id != "") {
        setSelectedItems((x) => [...x, item]);
        setItem({
          id: "",
          name: "",
          description: "",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Select item",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {});
      }
    } else {
      selectedServices.map((i) => {
        if (i.id === service.id) {
          err = true;
          return;
        }
      });

      if (err) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Service already selected",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          err = true;
        });

        return;
      }
      if (service.id != "") {
        getServiceItems({ id: service.id });
        setSelectedServices((x) => [...x, service]);
        setService({
          id: "",
          name: "",
          description: "",
          is_package: false,
          is_parent: false,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Select service",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    }
  };

  const removeTransaction = (type: string, id: string, index: number) => {
    if (type === "Item") {
      let tempItems: ItemType[] = [];

      for (let i = 0; i < selectedItems.length; i++) {
        if (i != index) {
          tempItems.push(selectedItems[i]);
        }
      }

      setSelectedItems(tempItems);
    } else {
      let tempServices: ServiceType[] = selectedServices.reduce(
        (arr: ServiceType[], data) => {
          if (id != data.id) arr.push(data);

          return arr;
        },
        []
      );

      setSelectedServices(tempServices);
    }
  };

  const tableCols =
    action != "View"
      ? ["Name", "Description", "Action"]
      : ["Name", "Description"];

  useEffect(() => {
    if (open) {
      if (action === "View") setDisabled(true);

      if (action != "Add") {
        getTransaction({ id: selectedData?.id, origin: "Transactions" });
      }

      getItems();
      getServices();
    }

    return () => {
      setDisabled(false);
      setCustomer(defaultCustomer);
      setSelectedItems([]);
      setSelectedServices([]);
      setItem(defaultItem);
      setService(defaultService);
    };
  }, [open]);

  useEffect(() => {
    if (getServiceItemsLoading === false) setOpenLoading(false);
    else setOpenLoading(true);
  }, [getServiceItemsLoading]);

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
          action={action}
          module="Transaction"
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box
          // component="form"
          // onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: 2,
            height: "100vh",
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={customers ?? []}
            getOptionKey={(option) => option.id ?? ""}
            getOptionLabel={(option) =>
              option.id != ""
                ? `${option.lname}, ${option.fname} ${option.mname}`
                : ""
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            noOptionsText={
              searchWord.length > 0 && customers.length === 0
                ? "Customer doesn't exist"
                : "Search for customer"
            }
            value={customer}
            onChange={(_event, newValue, reason) => {
              if (newValue != null) {
                // setFieldValue("customer_id", newValue.id);
                setCustomer(newValue);
              } else if (reason === "clear") setCustomers([]);
            }}
            fullWidth={true}
            size="small"
            disabled={disabled}
            ListboxProps={{ style: { maxHeight: "10rem" } }}
            componentsProps={{
              popper: {
                modifiers: [
                  {
                    name: "flip",
                    enabled: false,
                  },
                  // {
                  //   name: "preventOverflow",
                  //   enabled: true,
                  // },
                ],
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Customer"
                value={searchWord}
                onChange={(e) => searchItems(e.target.value)}
              />
            )}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={items ?? []}
              getOptionKey={(option) => option.id ?? ""}
              getOptionLabel={(option) => (option.id != "" ? option.name : "")}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              noOptionsText={
                searchWord.length > 0 && customers.length === 0
                  ? "Item doesn't exist"
                  : "Search for items"
              }
              value={item}
              onChange={(_event, newValue, reason) => {
                if (newValue != null) {
                  setItem(newValue);
                } else if (reason === "clear")
                  setItem({
                    id: "",
                    name: "",
                    description: "",
                  });
              }}
              fullWidth={true}
              size="small"
              disabled={disabled}
              ListboxProps={{ style: { maxHeight: "10rem" } }}
              componentsProps={{
                popper: {
                  modifiers: [
                    {
                      name: "flip",
                      enabled: false,
                    },
                  ],
                },
              }}
              renderInput={(params) => <TextField {...params} label="Item" />}
            />

            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#8C57FF",
              }}
              onClick={() => addTransaction("item")}
              disabled={disabled}
            >
              <Typography fontSize={20}>+</Typography>
            </Button>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={services ?? []}
              getOptionKey={(option) => option.id ?? ""}
              getOptionLabel={(option) => (option.id != "" ? option.name : "")}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              noOptionsText={
                searchWord.length > 0 && customers.length === 0
                  ? "Service doesn't exist"
                  : "Search for services"
              }
              value={service}
              onChange={(_event, newValue, reason) => {
                if (newValue != null) {
                  setService(newValue);
                } else if (reason === "clear")
                  setService({
                    id: "",
                    name: "",
                    description: "",
                    is_package: false,
                    is_parent: false,
                  });
              }}
              fullWidth={true}
              size="small"
              disabled={disabled}
              ListboxProps={{ style: { maxHeight: "10rem" } }}
              componentsProps={{
                popper: {
                  modifiers: [
                    {
                      name: "flip",
                      enabled: false,
                    },
                  ],
                },
              }}
              renderInput={(params) => (
                <TextField {...params} label="Service" />
              )}
            />
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#8C57FF",
              }}
              onClick={() => addTransaction("service")}
              disabled={disabled}
            >
              <Typography fontSize={20}>+</Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              height: "100%",
              maxHeight: "100%",
            }}
          >
            <TableContainer sx={{ height: "45vh", maxHeight: "45vh" }}>
              <Table stickyHeader>
                <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableRow>
                    {tableCols.map((col, i) => (
                      <TableCell
                        key={i}
                        size="small"
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: "#F5F5F5",
                          padding: "15px",
                        }}
                      >
                        {col === "Name" ? "Item " + col : col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedItems.map((data, i) => (
                    <TableRow key={i}>
                      <TableCell size="small" align="center">
                        {data.name}
                      </TableCell>
                      <TableCell size="small" align="center">
                        {data.description}
                      </TableCell>
                      {disabled === false ? (
                        <TableCell size="small" align="center">
                          <RowActionButton
                            color="red"
                            icon={<DeleteIcon />}
                            onClick={() =>
                              removeTransaction("Item", data.id ?? "", i)
                            }
                            title="Delete"
                          />
                        </TableCell>
                      ) : null}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer sx={{ height: "45vh", maxHeight: "45vh" }}>
              <Table stickyHeader>
                <TableHead sx={{ backgroundColor: "#F5F5F5" }}>
                  <TableRow>
                    {tableCols.map((col, i) => (
                      <TableCell
                        key={i}
                        size="small"
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: "#F5F5F5",
                          padding: "15px",
                        }}
                      >
                        {col === "Name" ? "Service " + col : col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedServices.map((data, i) => (
                    <TableRow key={i}>
                      <TableCell size="small" align="center">
                        {data.name}
                      </TableCell>
                      <TableCell size="small" align="center">
                        {data.description}
                      </TableCell>
                      {disabled === false ? (
                        <TableCell size="small" align="center">
                          <RowActionButton
                            color="red"
                            icon={<DeleteIcon />}
                            onClick={() =>
                              removeTransaction("Service", data.id ?? "", i)
                            }
                            title="Delete"
                          />
                        </TableCell>
                      ) : null}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <div hidden={disabled} style={{ alignSelf: "end" }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "10px",
                width: "120px",
                height: "50px",
                mr: "10px",
                backgroundColor: "#8C57FF",
              }}
              onClick={() => save()}
            >
              <Typography fontSize={"12px"} fontWeight={"bold"}>
                {action}
              </Typography>
            </Button>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CRUDDialog;
