import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  capacity,
  capacityById,
} from "../../../../redux/services/eventServices/capacityServices";

const initialState = {};

export const capacityId = createAsyncThunk("event/capacitybyid", async (id) => {
  return await capacityById(id);
});

export const yourCapacity = createAsyncThunk(
  "event/capacity",
  async (payload) => {
    return await capacity(payload);
  }
);
const eventCapacitySlice = createSlice({
  name: "eventCapacitySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
export default eventCapacitySlice.reducer;

// export const selectEvent = (state) => state.event.allEventList;

// export const useEventList = () => {
//     const allEventList = useSelector(selectEvent);
//     return useMemo(() => allEventList, [allEventList]);
// };
