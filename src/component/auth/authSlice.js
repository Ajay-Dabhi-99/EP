import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  forgotPass,
  logIn,
  logOut,
  newPass,
  otp,
  register,
  resendOtp,
} from "../../redux/services/authServices";

const getDefaultUser = () => {
  let user = localStorage.getItem("user");
  if (user && user !== "undefined") {
    return JSON.parse(user);
  } else {
    return null;
  }
};
const initialState = {
  user: localStorage.getItem("user") ? getDefaultUser() : {},
  key: "",
};

export const logInUser = createAsyncThunk("auth/login", async (payload) => {
  return await logIn(payload);
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotpassword",
  async (payload) => {
    return await forgotPass(payload);
  }
);

export const newPassword = createAsyncThunk(
  "auth/newpassword",
  async (payload) => {
    return await newPass(payload);
  }
);

export const otpVerify = createAsyncThunk("auth/otp", async (payload) => {
  return await otp(payload);
});

export const resendOtpVerify = createAsyncThunk(
  "auth/resendOtp",
  async (payload) => {
    return await resendOtp(payload);
  }
);

export const registration = createAsyncThunk(
  "auth/register",
  async (payload) => {
    return await register(payload);
  }
);

export const logOutUser = createAsyncThunk("auth/logOut", async () => {
  return await logOut();
});

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    removeToken: (state, action) => {
      localStorage.clear();
      state.user = {};
    },
    setKey: (state, action) => {
      state.key = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logInUser.fulfilled, (state, action) => {
      let user = action?.payload?.data?.Data;
      state.user = user ? user : {};
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.key = action?.payload?.data?.Data?.key;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.key = action?.payload?.data?.Data?.key;
    });
    builder.addCase(logOutUser.fulfilled, () => {
      localStorage.clear();
    });
  },
});
export default authSlice.reducer;

export const { removeToken, setKey } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export const useUser = () => {
  const user = useSelector(selectUser);
  localStorage.setItem("user", user ? JSON.stringify(user) : undefined);
  return useMemo(() => ({ user }), [user]);
};

export const selectKey = (state) => state.auth.key;

export const useKey = () => {
  const key = useSelector(selectKey);
  return useMemo(() => ({ key }), [key]);
};
