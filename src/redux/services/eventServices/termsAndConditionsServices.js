import { TANDCS, TANDC_BY_ID } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const tandcById = (id) => {
    return apiInstance.get(`${TANDC_BY_ID}${id}`, {
      headers: authHeader(),
    });
  };
  export const tandcs = (payload) => {
    return apiInstance.post(TANDCS, payload, {
      headers: authHeader(),
    });
  };
  