import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  isLoggedIn: false,
  errors: null,
  isLoading: false,
  // isSubmitting: false,
  profile: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState, // state
  reducers: {
    loginRequest: (state) => {
      // state = {
      //     ...state,
      //     access_token: null,
      //     errors: null,
      //     isLoggedIn: false,
      //     isLoading: true,
      //     profile: null,
      // }
      state.access_token = null;
      state.errors = null;
      state.isLoggedIn = false;
      state.isLoading = true;
      // state.isSubmitting = true;
      state.profile = null;
    },
    loginSuccess: (state, action) => {
      // state = {
      //     ...state,
      //     access_token: action.payload.payload.token.access_token,
      //     errors: null,
      //     isLoggedIn: true,
      //     isLoading: false,
      //     profile: action.payload.payload.profile,
      // }
      state.access_token = action.payload.payload.token.access_token;
      state.errors = null;
      state.isLoggedIn = true;
      state.isLoading = false;
      // state.isSubmitting = false;
      state.profile = action.payload.payload.profile;
    },
    loginFailed: (state, action) => {
      // state = {
      //     ...state,
      //     access_token: null,
      //     errors: action.payload.payload.errors,
      //     isLoggedIn: false,
      //     isLoading: false,
      //     profile: null,
      // }
      state.access_token = null;
      state.errors = action.payload.payload.message;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.profile = null;
    },
    logOut: (state) => {
      state.access_token = null;
      state.errors = null;
      state.isLoggedIn = false;
      state.isLoading = true;
      // state.isSubmitting = true;
      state.profile = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailed } = authSlice.actions;

export default authSlice.reducer;
