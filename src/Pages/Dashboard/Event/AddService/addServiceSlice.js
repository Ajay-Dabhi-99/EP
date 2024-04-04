import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  addEventService,
  deleteEventService,
  getSelectService,
  listServices,
  selectEventService,
} from "../../../../redux/services/eventServices/addServiceServices";

const initialState = {
  selectServices: []
};

export const addService = createAsyncThunk(
  "event/addService",
  async (payload) => {
    return await addEventService(payload);
  }
);

export const deleteService = createAsyncThunk(
  "event/deleteService",
  async (payload) => {
    return await deleteEventService(payload);
  }
);

export const selectService = createAsyncThunk(
  "event/selectService",
  async (payload) => {
    return await selectEventService(payload);
  }
);

export const servicesList = createAsyncThunk(
  "event/servicelist",
  async (id) => {
    return await listServices(id);
  }
);

export const selectServiceGet = createAsyncThunk(
  "event/getselectservice",
  async (id) => {
    return await getSelectService(id);
  }
);

const addServiceSlice = createSlice({
  name: "addServiceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addService.fulfilled, (state, action) => { });
    builder.addCase(selectServiceGet.fulfilled, (state, action) => {
      state.selectServices = action?.payload?.data?.Data;
    });
  },
});
export default addServiceSlice.reducer;

export const selectEventServices = (state) => state.addService.selectServices;

export const useSelectServices = () => {
  const selectServices = useSelector(selectEventServices);
  return useMemo(() => selectServices, [selectServices]);
};