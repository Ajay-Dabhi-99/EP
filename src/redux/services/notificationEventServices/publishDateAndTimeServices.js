import { NOTIFICATION_SETSCHEDULE } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const notificationSetSchedule = (payload) => {
    return apiInstance.post(NOTIFICATION_SETSCHEDULE, payload, {
        headers: authHeader(),
    });
};