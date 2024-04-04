import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nCount: JSON.parse(localStorage.getItem("nStepCount")) || 0,
};

const notificationstepPogressCountSlice = createSlice({
  name: "notificationstepPogressCountSlice",
  initialState,
  reducers: {
    increment: (state) => {
      state.nCount += 1;
      localStorage.setItem("nStepCount", JSON.stringify(state.nCount));
    },
    decrement: (state) => {
      if (state.nCount > 0) {
        state.nCount -= 1;
        localStorage.setItem("nStepCount", JSON.stringify(state.nCount));
      }
    },
    setNumber: (state, action) => {
      state.nCount = action.payload;
      localStorage.setItem("nStepCount", JSON.stringify(state.nCount));
    },
    reset: (state) => {
      state.nCount = 0;
      localStorage.setItem("nStepCount", JSON.stringify(state.nCount));
    },
  },
});

export const { increment, decrement, setNumber, reset } =
  notificationstepPogressCountSlice.actions;

export default notificationstepPogressCountSlice.reducer;
