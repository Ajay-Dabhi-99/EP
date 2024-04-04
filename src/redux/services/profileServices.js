import {
  BUSINESS_PROFILE,
  BUSINESS_PROFILE_PIC,
  PROFILE,
  PROFILE_PIC,
} from "../../api/constApi";
import authHeader, { imageHeader } from "./authHeader";
import { apiInstance } from "./axiosApi";

export const profile = () => {
  return apiInstance.get(PROFILE, { headers: authHeader() });
};

export const addProfile = (payload) => {
  return apiInstance.post(PROFILE, payload, { headers: authHeader() });
};

export const addProfilePic = (payload) => {
  return apiInstance.post(PROFILE_PIC, payload, { headers: imageHeader() });
};

export const addBusinessProfile = (payload) => {
  return apiInstance.post(BUSINESS_PROFILE, payload, { headers: authHeader() });
};

export const addBusinessProfilePic = (payload) => {
  return apiInstance.post(BUSINESS_PROFILE_PIC, payload, {
    headers: imageHeader(),
  });
};
