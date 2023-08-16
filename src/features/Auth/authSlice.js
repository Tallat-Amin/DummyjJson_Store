import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dummyJson } from "../../axios/axios";

export const authenticateUser = createAsyncThunk(
  "userAuth",
  async ({ username, password }) => {
    try {
      const response = await dummyJson.post("/auth/login", {
        username: username,
        password: password,
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching data: " + error.message);
    }
  },
);
const initialState = {
  token: null,
  status: "idle",
  error: "",
  loginSuccess: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("userToken");
      state.token = null;
      state.status = "idle";
      state.error = "";
    },
    setLoginSuccess: (state) => {
      state.loginSuccess = true;
    },
    clearLoginSuccess: (state) => {
      state.loginSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = "success";
        state.token = action.payload.token;
        localStorage.setItem("userToken", action.payload.token);
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const { logoutUser, setLoginSuccess, clearLoginSuccess } =
  authSlice.actions;

export default authSlice.reducer;
