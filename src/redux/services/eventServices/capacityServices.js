import { CAPACITY, CAPACITY_BY_ID } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const capacityById = (id) => {
    return apiInstance.get(`${CAPACITY_BY_ID}${id}`, {
      headers: authHeader(),
    });
  };
  export const capacity = (payload) => {
    return apiInstance.post(CAPACITY, payload, {
      headers: authHeader(),
    });
  };