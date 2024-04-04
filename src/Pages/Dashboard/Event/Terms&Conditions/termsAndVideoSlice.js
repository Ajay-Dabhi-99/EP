import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  tandcById,
  tandcs,
} from "../../../../redux/services/eventServices/termsAndConditionsServices";

const initialState = {};

export const tandcId = createAsyncThunk("event/tandcbyid", async (payload) => {
  return await tandcById(payload);
});

export const termsAndCondition = createAsyncThunk(
  "event/termsandcondition",
  async (payload) => {
    return await tandcs(payload);
  }
);

const eventTermsAndConditionSlice = createSlice({
  name: "eventTermsAndConditionSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
export default eventTermsAndConditionSlice.reducer;

// export const selectEvent = (state) => state.event.allEventList;

// export const useEventList = () => {
//     const allEventList = useSelector(selectEvent);
//     return useMemo(() => allEventList, [allEventList]);
// };
