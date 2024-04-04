import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import {
  addBusinessProfile,
  addBusinessProfilePic,
  addProfile,
  addProfilePic,
  profile,
} from "../../redux/services/profileServices";

const getProfileDetail = () => {
  let profileDetails = localStorage.getItem("Profile");
  if (profileDetails && profileDetails !== "undefined") {
    return JSON.parse(profileDetails);
  } else {
    return null;
  }
};

const initialState = {
  profileDetails: localStorage.getItem("Profile") ? getProfileDetail() : {},
};

export const getProfileDetails = createAsyncThunk(
  "profile/getProfile",
  async () => {
    return await profile();
  }
);

export const addProfileDetails = createAsyncThunk(
  "profile/addProfile",
  async (payload) => {
    return await addProfile(payload);
  }
);

export const addProfileImage = createAsyncThunk(
  "profile/addProfilePic",
  async (payload) => {
    return await addProfilePic(payload);
  }
);

export const addBusinessProfileDetails = createAsyncThunk(
  "profile/addBusinessProfile",
  async (payload) => {
    return await addBusinessProfile(payload);
  }
);

export const addBusinessProfileImage = createAsyncThunk(
  "profile/addBusinessProfilePic",
  async (payload) => {
    return await addBusinessProfilePic(payload);
  }
);

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileDetails.fulfilled, (state, action) => {
      state.profileDetails = action?.payload?.data?.Data;
    });
    builder.addCase(addProfileImage.fulfilled, (state, action) => {
      state.profileDetails = action?.payload?.data?.Data;
    });
  },
});

export default profileSlice.reducer;

export const selectDetails = (state) => state.profile.profileDetails;

export const useProfileDetails = () => {
  const profileDetails = useSelector(selectDetails);
  localStorage.setItem("Profile", profileDetails ? JSON.stringify(profileDetails) : undefined);
  return useMemo(() => profileDetails, [profileDetails]);
};

