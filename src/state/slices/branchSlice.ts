import { createSlice } from "@reduxjs/toolkit";
import BranchEmployeeType from "../../types/BranchEmployee";

type initialState = {
  id: string;
  name: string;
  address: string;
  employees: BranchEmployeeType[];
};

const initialState: initialState = {
  id: "",
  name: "",
  address: "",
  employees: [],
};

export const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    branchClear: (state) => {
      state.id = "";
      state.name = "";
      state.address = "";
    },
    branchSet: (state, action) => {
      state.id = action.payload.payload.id;
      state.name = action.payload.payload.name;
      state.address = action.payload.payload.address;
      state.employees = action.payload.payload.employees;
    },
    branchAddEmployee: (state, action) => {
      console.log(action.payload, "state");
      state.employees = [...state.employees, action.payload];
    },
    branchDeleteEmployee: (state, action) => {
      state.employees = state.employees.reduce(
        (arr: BranchEmployeeType[], employee) => {
          if (employee.employee_id != action.payload.id) arr.push(employee);

          return arr;
        },
        []
      );
    },
  },
});

export const { branchClear, branchSet } = branchSlice.actions;

export default branchSlice.reducer;
