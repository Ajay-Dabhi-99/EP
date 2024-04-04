import { SELECT_BUSINESS } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const selectedBusiness = (payload) => {
    return apiInstance.post(SELECT_BUSINESS, payload, {
        headers: authHeader(),
    });
};