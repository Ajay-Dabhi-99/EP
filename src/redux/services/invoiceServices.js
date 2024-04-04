import { GET_ONE_INVOICE, INVOICE } from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const invoice = (payload) => {
  return apiInstance.post(INVOICE, payload, { headers: authHeader() });
};

export const getOneInvoice = (payload) => {
  return apiInstance.post(GET_ONE_INVOICE, payload, { headers: authHeader() });
};

