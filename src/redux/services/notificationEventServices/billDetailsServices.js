import { GETONE_NOTIFICATION, NOTIFICATION_COUPON_LIST, NOTIFICATION_SETTING, PAY_NOW } from "../../../api/constApi";
import authHeader from "../authHeader";
import { apiInstance } from "../axiosApi";

export const getoneNotification = (payload) => {
    return apiInstance.post(GETONE_NOTIFICATION, payload, {
        headers: authHeader(),
    });
};
export const notificationSetting = () => {
    return apiInstance.get(NOTIFICATION_SETTING, {
        headers: authHeader(),
    });
};
export const notificationCouponList = () => {
    return apiInstance.get(NOTIFICATION_COUPON_LIST, {
        headers: authHeader(),
    });
};

export const payNow = (payload) => {
    return apiInstance.post(PAY_NOW, payload, {
        headers: authHeader(),
    });
};
