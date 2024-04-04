import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  addPlacesEvent,
  removePlacesEvent,
} from "../../../../redux/services/eventServices/addPlaceServices";

const initialState = {
  addPlace: [],
};

export const addPlaces = createAsyncThunk("event/addPlace", async (eventId) => {
  return await addPlacesEvent(eventId);
});

export const removeEvent = createAsyncThunk("event/remove", async (eventId) => {
  return await removePlacesEvent(eventId);
});



const eventAddPlaceSlice = createSlice({
  name: "eventAddPlaceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPlaces.fulfilled, (state, action) => {
      state.addPlace = action?.payload?.data?.Data;
    });
  },
});
export default eventAddPlaceSlice.reducer;

export const selectAddPlaces = (state) => state.eventAddPlace.addPlace;

export const useAddPlaces = () => {
  const addPlace = useSelector(selectAddPlaces);
  return useMemo(() => addPlace, [addPlace]);
};
