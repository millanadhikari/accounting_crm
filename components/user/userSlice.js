import { createSlice } from "@reduxjs/toolkit";
import {User} from './usertype'

const initialState = {
  user: {},
  isLoading: false,
  error: "",
  sidebarOpen:false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = "";
    },
    getUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    getSidebarStatus:(state, {payload}) => {
      state.isLoading=true;
      state.sidebarOpen= payload
    }
  },
});

export const {
  getUserPending,
  getUserSuccess,
  getUserFail,
  getSidebarStatus
} = userSlice.actions;

export default userSlice.reducer;