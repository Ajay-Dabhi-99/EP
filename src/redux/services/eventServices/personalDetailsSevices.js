import axios from "axios";
import { PERSONAL_DETAIL_EVENT, PERSONAL_DETAIL_ID, PINCODEMATCH } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const personalDetailById = (id) => {
  return apiInstance.get(`${PERSONAL_DETAIL_ID}${id}`, {
    headers: authHeader(),
  });
};
export const personalDetailEvent = (payload) => {
  return apiInstance.post(PERSONAL_DETAIL_EVENT, payload, {
    headers: authHeader(),
  });
};
export const pincodeValidation = (values) => {
  return axios.get(`${PINCODEMATCH}${values}`, {
    headers: authHeader(),
  })
};
