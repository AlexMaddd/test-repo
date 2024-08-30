import { useEffect, useState } from "react";
import { getAxiosInstance } from "../api/axios";
import Swal from "sweetalert2";

type APIProps = {
  method: "get" | "post" | "put" | "patch" | "delete";
  url: string;
  immediate?: boolean;
  onSuccess?: (props: OnSuccessProps) => void;
};

type OnSuccessProps = {
  data?: any;
  id?: any;
  payload?: any;
};

const useAxios = (props: APIProps) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const [backdropLoading, setBackdropLoading] = useState(false);

  const callApi = (payload?: any) => {
    if (["post", "put", "patch"].includes(props.method)) {
      // Create URL parameters
      let params = "";
      for (const [key, value] of Object.entries(payload)) {
        if (!["id", "origin"].includes(key))
          params = params + `${key}=${value}&`;
      }
      // remove last & character
      params = params.slice(0, -1);

      getAxiosInstance()
        .request(
          payload.origin != "Transactions" &&
            payload.origin != "Transaction Employees"
            ? {
                method: props.method,
                url:
                  // props.method == "post" ? props.url : `${props.url}/${payload?.id}`,
                  props.method == "post"
                    ? payload.origin === "Service Items"
                      ? `${props.url}/${payload.id}/items?${params}`
                      : payload.origin === "Transaction Status"
                      ? `${props.url}/${payload.id}/update-transaction-status?${params}`
                      : payload.origin === "Work Status"
                      ? `${props.url}/${payload.id}/update-work-status?${params}`
                      : `${props.url}?${params}`
                    : `${props.url}/${payload.id}?${params}`,
                // data: payload,
              }
            : {
                method: props.method,
                url:
                  props.method === "post"
                    ? payload.origin === "Transaction Employees"
                      ? `${props.url}/${payload.id}/update-workers`
                      : props.url
                    : `${props.url}/${payload.id}`,
                data: payload,
              }
        )
        .then((res) => {
          setResponse(res.data);
          props.onSuccess?.(
            payload.origin != "Service Items"
              ? { data: res?.data }
              : { data: res?.data, payload: payload }
          );
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message,
            showConfirmButton: false,
            timer: 3000,
          });
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });
    } else if (props.method == "delete") {
      getAxiosInstance()
        .request({
          method: props.method,
          url: `${props.url}/${payload?.id}`,
        })
        .then((res) => {
          setResponse(res.data);
          props.onSuccess?.({ data: res?.data, id: payload.id });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message,
            showConfirmButton: false,
            timer: 3000,
          });
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });
    } else {
      setBackdropLoading(true);
      getAxiosInstance()
        .request({
          method: props.method,
          url:
            payload?.id == undefined
              ? props.url
              : `${props.url}/${payload?.id}`,
          params: payload,
        })
        .then((res) => {
          setResponse(res.data);
          props.onSuccess?.({ data: res?.data });
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setBackdropLoading(false);
          setloading(false);
        });
    }
  };

  if (props.immediate == true || props.immediate === undefined) {
    useEffect(() => {
      callApi();
    }, []);
  }

  return { response, error, loading, backdropLoading, callApi };
};

export default useAxios;
