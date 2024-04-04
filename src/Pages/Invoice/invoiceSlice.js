import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOneInvoice, invoice } from "../../redux/services/invoiceServices";

const initialState = {};

export const invoiceDetailsList = createAsyncThunk(
  "invoive/list",
  async (payload) => {
    return await invoice(payload);
  }
);

export const getOneInvoiceDetail = createAsyncThunk(
  "invoive/getOneInvoiceDetail",
  async (payload) => {
    return await getOneInvoice(payload);
  }
);

const invoiceSlice = createSlice({
  name: "invoiceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(invoiceDetailsList.fulfilled, (state, action) => {});
  },
});

export default invoiceSlice.reducer;
