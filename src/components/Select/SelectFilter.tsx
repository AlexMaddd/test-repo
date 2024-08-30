import { Select } from "@mui/material";

const SelectFilter = (props: any) => {
  return (
    <Select
      value={props.value}
      autoWidth
      size="small"
      sx={{
        fontWeight: "bold",
        borderRadius: "10px",
        width: props.fullWidth ? "100%" : "120px",
        color: "#004179",
        "&: hover": {},
        "&: focus": {},
      }}
      onChange={props.onChange}
    >
      {props.items}
    </Select>
  );
};

export default SelectFilter;
