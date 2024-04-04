import { REDEEM } from "../api/constApi";
import authHeader from "../redux/services/authHeader";
import { apiInstance } from "../redux/services/axiosApi";

export const redeem = () => {
    return apiInstance.get(REDEEM, { headers: authHeader() });
};
