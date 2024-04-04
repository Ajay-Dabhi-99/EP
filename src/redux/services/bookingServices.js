import { BOOKING } from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const booking = (payload) => {
  return apiInstance.post(BOOKING, payload, { headers: authHeader() });
};
