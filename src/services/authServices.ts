import {getAxiosInstance} from '../api/axios'

export const loginService = (values: any) => {
    return getAxiosInstance().post('auth/login', values)
};
  