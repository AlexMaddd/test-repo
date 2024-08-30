import axios, { Axios } from "axios";
import store from '../store';
import { logout } from "../state/actions/authActions";

let axiosInstance: Axios | null  = null;
const API_URL = import.meta.env.VITE_BASE_URL.replace(/\s/g, '');

export const getAxiosInstance = () => {
    if(axiosInstance == null)
    {
        axiosInstance = axios.create({
            baseURL: API_URL,
        })
    }

    axiosInstance.interceptors.request.use((config) => {
        // console.log(config, 'config')
        if (config.baseURL === API_URL && !config.headers.Authorization) {
          const token = store.getState().root?.auth?.access_token;
          const branch_id = store.getState().root?.branch?.id;
        //   console.log(token, 'token')
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }

          if(branch_id)
            config.headers['branch-id'] = branch_id;
        }
        return config;
    });

      axiosInstance.interceptors.response.use(
        (response: any) => {
          if (response.config.method !== 'get') {
            if (response.config.url !== 'auth/login') {
            //   store.dispatch(setAPISuccessMessage(response && response?.data.message ? response?.data.message : 'Success'));
            }
          }
          return Promise.resolve(response);
        },
        (error) => {
          if (error.response?.status === 401) {
            store.dispatch(logout());
            // store.dispatch(
            //   setAPIErrorMessage(error.response && error.response.data.message ? error.response.data.message : 'Error')
            // );
    
            return Promise.reject(error);
          } else {
            // store.dispatch(
            //   setAPIErrorMessage(error.response && error.response.data.message ? error.response.data.message : 'Error')
            // );
            return Promise.reject(error);
          }
        }
      );

    return axiosInstance;
}
