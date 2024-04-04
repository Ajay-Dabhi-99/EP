import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: JSON.parse(localStorage.getItem("stepCount")) || 0,
};

const stepProgressCountSlice = createSlice({
  name: "StepProgressCountSlice",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
      localStorage.setItem("stepCount", JSON.stringify(state.count));
    },
    decrement: (state) => {
      if (state.count > 0) {
        state.count -= 1;
        localStorage.setItem("stepCount", JSON.stringify(state.count));
      }
    },
    setNumber: (state, action) => {
      state.count = action.payload;
      console.log(action.payload, "action.payload");
      localStorage.setItem("stepCount", JSON.stringify(state.count));
    },
    reset: (state) => {
      state.count = 0;
      localStorage.setItem("stepCount", JSON.stringify(state.count));
    },
    clickNum: (state, action) => {
      console.log(action);
      state.count = action.payload + 1 || 0;
      localStorage.setItem("stepCount", JSON.stringify(state.count));
    },
  },
});

export const { increment, decrement, setNumber, reset, clickNum } =
  stepProgressCountSlice.actions;

export default stepProgressCountSlice.reducer;
