import { DISCOUNT, DISCOUNT_BY_ID, DISCOUNT_LIST, GETSELECTSERVICE_BY_ID, GET_SELECT_SERVICE_DISCOUNT } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const discountList = () => {
  return apiInstance.get(DISCOUNT_LIST, {
    headers: authHeader(),
  });
};
export const discountById = (id) => {
  return apiInstance.get(`${DISCOUNT_BY_ID}${id}`, {
    headers: authHeader(),
  });
};
export const discount = (payload) => {
  return apiInstance.post(DISCOUNT, payload, {
    headers: authHeader(),
  });
};
export const getSelectServiceById = (id) => {
  return apiInstance.get(`${GETSELECTSERVICE_BY_ID}${id}`, {
    headers: authHeader(),
  });
};

export const getSelectServiceDiscount = (id) => {
  return apiInstance.get(`${GET_SELECT_SERVICE_DISCOUNT}${id}`, {
    headers: authHeader(),
  });
};