import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { values } from "lodash";
import { async } from "q";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  personalDetailById,
  personalDetailEvent,
  pincodeValidation,
} from "../../../../redux/services/eventServices/personalDetailsSevices";

const initialState = {};

export const personalDetailId = createAsyncThunk(
  "event/personaldetailid",
  async (id) => {
    return await personalDetailById(id);
  }
);

export const personalDetails = createAsyncThunk(
  "event/personaldetails",
  async (payload) => {
    return await personalDetailEvent(payload);
  }
);

export const pincodematchs = createAsyncThunk(
  "event/pincode",
  async (values) => {
    return await pincodeValidation(values);
  }

)

const eventPersonalDetailsSlice = createSlice({
  name: "eventAboutPlaceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => { },
});
export default eventPersonalDetailsSlice.reducer;

// export const selectEvent = (state) => state.eventPersonalDetails.;

// export const useEventList = () => {
//     const allEventList = useSelector(selectEvent);
//     return useMemo(() => allEventList, [allEventList]);
// };
