import { ADD_EQUIPMENT, DELETE_EQUIPMENT, EQUIPMENT_BY_ID, EQUIPMENT_LIST, SELECT_EQUIPMENT } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const addEventEquipment = (payload) => {
  return apiInstance.post(ADD_EQUIPMENT, payload, {
    headers: authHeader(),
  });
};

export const selectEventEquipment = (payload) => {
  return apiInstance.post(SELECT_EQUIPMENT, payload, {
    headers: authHeader(),
  });
};

export const deleteEventEquipment = (payload) => {
  return apiInstance.post(DELETE_EQUIPMENT, payload, {
    headers: authHeader(),
  });
};
export const equipmentList = (type) => {
  return apiInstance.get(`${EQUIPMENT_LIST}${type}`, {
    headers: authHeader(),
  });
};

export const equipmentById = (id) => {
  return apiInstance.get(`${EQUIPMENT_BY_ID}${id}`, {
    headers: authHeader(),
  });
};
