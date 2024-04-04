import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { booking } from "../../redux/services/bookingServices";

const initialState = {
  bookings: {},
};

export const userBooking = createAsyncThunk("user/booking", async (payload) => {
  return await booking(payload);
});

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userBooking.fulfilled, (state, action) => {
      state.bookings = action?.payload?.data?.Data;
    });
  },
});

export default bookingSlice.reducer;

export const selectBookings = (state) => state.booking.bookings;

export const useBookings = () => {
  const bookings = useSelector(selectBookings);
  return useMemo(() => bookings, [bookings]);
};
