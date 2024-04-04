import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addEventItem,
  deleteEventItem,
  selectEventItem,
} from "../../../../redux/services/eventServices/addItemsServices";

const initialState = {
  addItems: [],
};

export const addItem = createAsyncThunk("event/addItem", async (payload) => {
  return await addEventItem(payload);
});

export const selectItem = createAsyncThunk(
  "event/selectItem",
  async (payload) => {
    return await selectEventItem(payload);
  }
);

export const deleteItem = createAsyncThunk(
  "event/deleteItem",
  async (payload) => {
    return await deleteEventItem(payload);
  }
);

const addItemsSlice = createSlice({
  name: "addItemsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.addItems = action?.payload?.data?.Data;
    });
  },
});
export default addItemsSlice.reducer;
