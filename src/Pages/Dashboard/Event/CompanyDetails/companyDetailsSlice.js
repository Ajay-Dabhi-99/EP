import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  companyDetailById,
  companyDetails,
  imgUpload,
  pdfUpload,
  videoUpload,
} from "../../../../redux/services/eventServices/companyDetailsServices";

const initialState = {
  stateCompanyDetailId: []
};

export const companyDetailId = createAsyncThunk(
  "event/companydetailbyid",
  async (id) => {
    return await companyDetailById(id);
  }
);

export const uploadPdf = createAsyncThunk(
  "event/pdfUpload",
  async (payload) => {
    return await pdfUpload(payload);
  }
);

export const uploadCompanyImg = createAsyncThunk(
  "event/uploadCompanyImg",
  async (payload) => {
    return await imgUpload(payload);
  }
);

export const uploadCompanyVideos = createAsyncThunk(
  "event/uploadCompanyVideos",
  async (payload) => {
    return await videoUpload(payload);
  }
);

export const detailsOfCompany = createAsyncThunk(
  "event/detailsofcompany",
  async (payload) => {
    return await companyDetails(payload);
  }
);

const eventCompanyDetailsSlice = createSlice({
  name: "eventCompanyDetailsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(companyDetailId.fulfilled, (state, action) => {
      state.stateCompanyDetailId = action?.payload?.data?.Data
    })
  },
});
export default eventCompanyDetailsSlice.reducer;

export const selectCompanyDetailId = (state) => state.eventCompanyDetails.stateCompanyDetailId;

export const useCompanyDetailId = () => {
  const stateCompanyDetailId = useSelector(selectCompanyDetailId);
  return useMemo(() => stateCompanyDetailId, [stateCompanyDetailId]);
};
