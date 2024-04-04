import { SELECT_USER } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const selectNotificationUser = (payload) => {
    return apiInstance.post(SELECT_USER, payload, {
        headers: authHeader(),
    });
};
