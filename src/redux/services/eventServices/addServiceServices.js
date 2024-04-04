import { ADD_SERVICE, DELETE_SERVICE, GETSELECTSERVICE, LISTSERVICE, SELECT_SERVICE } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const addEventService = (payload) => {
  return apiInstance.post(ADD_SERVICE, payload, {
    headers: authHeader(),
  });
};

export const deleteEventService = (payload) => {
  return apiInstance.post(DELETE_SERVICE, payload, {
    headers: authHeader(),
  });
};

export const selectEventService = (payload) => {
  return apiInstance.post(SELECT_SERVICE, payload, {
    headers: authHeader(),
  });
};

export const listServices = (id) => {
  return apiInstance.get(`${LISTSERVICE}${id}`, {
    headers: authHeader(),
  });
};

export const getSelectService = (id) => {
  return apiInstance.get(`${GETSELECTSERVICE}${id}`, {
    headers: authHeader(),
  });
};
