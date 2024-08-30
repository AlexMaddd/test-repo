import { loginService } from "../../services/authServices";
import { Dispatch } from "@reduxjs/toolkit";
import { loginFailed, loginSuccess } from "../slices/authSlice";
// import { loginFailed, loginRequest, loginSuccess } from "../slices/authSlice";

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const login = (values: {email:string, password:string}) => {
//     return (dispatch: Dispatch) => {
//       dispatch({type: authConstants.LOGIN_REQUEST});
//       return loginService(values)
//         .then((result: any) => {
//           dispatch({
//             type: authConstants.LOGIN_SUCCESS,
//             payload: result.data
//           });
//           return Promise.resolve(result);
//         })
//         .catch((e: any) => {
//           dispatch(error(e));
//           return Promise.reject(e);
//         });
//     };
// };

export const login = (values: {email:string, password:string}) => {
  return (dispatch: Dispatch) => {
    dispatch({type: 'auth/loginRequest'});
    return loginService(values)
      .then((result: any) => {
        dispatch(loginSuccess({type: 'auth/loginSuccess', payload: result.data}));
        return Promise.resolve(result);
      })
      .catch((e: any) => {
        console.log(e)
        dispatch(loginFailed({type:'auth/loginFailed', payload:e}));
        return Promise.reject(e);
      });
  };
};

export const logout = () => {
  return {type: 'auth/logOut'}
}

  // export const error = (e:any) => {
  //   return {
  //     type: authConstants.LOGIN_FAILED,
  //     errors: e,
  //   };
  // };

