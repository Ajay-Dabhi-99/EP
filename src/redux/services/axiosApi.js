import axios from "axios";
import { baseUrl } from "../../api/baseUrl";
import { toast, ToastContainer } from "react-toastify";

export const apiInstance = axios.create({
  baseURL: baseUrl,
});
apiInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error, "Axios Error ==");
    toast.error(error?.response?.data?.Message);
    if (!error?.response?.data?.Message) {
      toast.error('Something went Wrong!')
    }
    if (error?.response?.data?.code === 'E_USER_NOT_FOUND') {
    }

    if (typeof error?.response?.data?.message === "string") {
      toast.error(error.response.data.message);
    } else {
      for (let i = 0; i < error?.response?.data?.message?.length; i++) {
        toast.error(error.response.data.message[i]);
      }
      return Promise.reject(error);
    }
  }
);