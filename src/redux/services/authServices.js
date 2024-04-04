import {
  FORGET_PASSWORD,
  LOGIN,
  LOGOUT,
  NEW_PASSWORD,
  OTP,
  REGISTER,
  RESEND_OTP,
} from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const logIn = (payload) => {
  return apiInstance.post(LOGIN, payload);
};

export const forgotPass = (payload) => {
  return apiInstance.post(FORGET_PASSWORD, payload);
};

export const newPass = (payload) => {
  return apiInstance.post(NEW_PASSWORD, payload);
};

export const otp = (payload) => {
  return apiInstance.post(OTP, payload);
};

export const resendOtp = (payload) => {
  return apiInstance.post(RESEND_OTP, payload);
};

export const register = (payload) => {
  return apiInstance.post(REGISTER, payload);
};

export const logOut = () => {
  return apiInstance.post(LOGOUT, {}, { headers: authHeader() });
};
