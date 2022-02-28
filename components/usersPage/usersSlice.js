import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
  createUserLoading:false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersPending: (state) => {
      state.isLoading = true;
    },
    getUsersSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
      state.error = "";
    },
    getUsersFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    createUserLoading: (state) => {
      state.createUserLoading = true;
    },
    createUserSuccess: (state) => {
      state.createUserLoading = false;
    },
    createUserFail: (state, { payload }) => {
      state.createUserLoading = false;
      state.error = payload;
    },
    
   
  },
});

export const {
  getUsersPending,
  getUsersSuccess,
  getUsersFail,
  createUserLoading,
  createUserSuccess,
  createUserFail,
} = usersSlice.actions;

export default usersSlice.reducer;