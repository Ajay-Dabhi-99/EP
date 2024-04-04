import {
    CREATE_NOTIFICATION,
    NOTIFICATION,
    PHOTOUPLOAD,
} from "../../api/constApi";
import authHeader, { imageHeader } from "./authHeader";
import { apiInstance } from "./axiosApi";

export const notification = (payload) => {
    return apiInstance.post(NOTIFICATION, payload, { headers: authHeader() });
};

export const createNotification = (payload) => {
    return apiInstance.post(CREATE_NOTIFICATION, payload, {
        headers: authHeader(),
    });
};

export const photoUpload = (payload) => {
    return apiInstance.post(PHOTOUPLOAD, payload, { headers: imageHeader() });
};









