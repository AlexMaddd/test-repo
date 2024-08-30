import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import branchSlice from "./branchSlice";

const reducer = combineReducers({
    auth: authSlice,
    branch: branchSlice
});

export default reducer;