import { GET_IN_TOUCH } from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const getInTouch = (payload) => {
    return apiInstance.post(GET_IN_TOUCH, payload, { headers: authHeader() });
};