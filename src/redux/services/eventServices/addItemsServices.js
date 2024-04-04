import { ADD_ITEM, DELETE_ITEM, SELECT_ITEM } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const addEventItem = (payload) => {
  return apiInstance.post(ADD_ITEM, payload, {
    headers: authHeader(),
  });
};

export const selectEventItem = (payload) => {
  return apiInstance.post(SELECT_ITEM, payload, {
    headers: authHeader(),
  });
};

export const deleteEventItem = (payload) => {
  return apiInstance.post(DELETE_ITEM, payload, {
    headers: authHeader(),
  });
};
