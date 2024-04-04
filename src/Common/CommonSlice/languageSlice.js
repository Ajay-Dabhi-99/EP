import { createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const initialState = {
  language: localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "en",
};

const languageSlice = createSlice({
  name: "languageSlice",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action?.payload;
      localStorage.setItem("language", state.language);
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;

export const selectLang = (state) => state.language.language;

export const useLanguage = () => {
  const language = useSelector(selectLang);
  localStorage.setItem("language", language);
  return useMemo(() => language, [language]);
};
