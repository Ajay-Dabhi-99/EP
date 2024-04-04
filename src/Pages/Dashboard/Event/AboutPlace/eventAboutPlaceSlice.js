import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  aboutPlacesById,
  aboutPlacesEvent,
  aboutPlacesPhotoUpload,
} from "../../../../redux/services/eventServices/aboutPlaceServices";

const initialState = {};

export const aboutPlacesPickUpload = createAsyncThunk(
  "event/photoupload",
  async (payload) => {
    return await aboutPlacesPhotoUpload(payload);
  }
);

export const aboutPlaces = createAsyncThunk(
  "event/aboutplaces",
  async (payload) => {
    return await aboutPlacesEvent(payload);
  }
);

export const aboutPlacesId = createAsyncThunk(
  "event/aboutplacesid",
  async (id) => {
    return await aboutPlacesById(id);
  }
);

const eventAboutPlaceSlice = createSlice({
  name: "eventAboutPlaceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => { },
});
export default eventAboutPlaceSlice.reducer;

// export const selectEvent = (state) => state.event.allEventList;

// export const useEventList = () => {
//   const allEventList = useSelector(selectEvent);
//   return useMemo(() => allEventList, [allEventList]);
// };
