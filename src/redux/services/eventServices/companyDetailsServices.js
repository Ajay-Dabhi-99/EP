import { COMPANYDETAIL_BY_ID, COMPANY_DETAIL, IMG_UPLOAD, PDF_UPLOAD, VIDEO_UPLOAD } from "../../../api/constApi";
import authHeader, { imageHeader } from "../authHeader";
import { apiInstance } from "../axiosApi";

export const companyDetailById = (id) => {
    return apiInstance.get(`${COMPANYDETAIL_BY_ID}${id}`, {
      headers: authHeader(),
    });
  };
  export const pdfUpload = (payload) => {
    return apiInstance.post(PDF_UPLOAD, payload, {
      headers: authHeader(),
    });
  };
  export const imgUpload = (payload) => {
    return apiInstance.post(IMG_UPLOAD, payload, {
      headers: imageHeader(),
    });
  };
  export const videoUpload = (payload) => {
    return apiInstance.post(VIDEO_UPLOAD, payload, {
      headers: authHeader(),
    });
  };
  export const companyDetails = (payload) => {
    return apiInstance.post(COMPANY_DETAIL, payload, {
      headers: authHeader(),
    });
  };