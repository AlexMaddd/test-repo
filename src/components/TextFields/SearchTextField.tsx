import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchTextField = (props: any) => (
  <TextField
    placeholder={props.placeholder}
    variant="outlined"
    size={props.size}
    value={props.value}
    onChange={props.onChange}
    sx={props.sx}
    InputProps={{
      style: {
        borderRadius: "20px",
      },
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
);

export default SearchTextField;
