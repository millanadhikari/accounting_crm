import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    spaces: [],
    isLoading: false,
    createSpaceLoading:false,
    error: "",
    selectedSpace: {},
   
  };
  const spaceListSlice = createSlice({
    name: 'spaceList',
    initialState,
    reducers: {
      fetchSpaceLoading: (state) => {
        state.isLoading = true;
      },
      fetchSpaceSuccess: (state, action) => {
        state.spaces = action.payload;
        state.isLoading = false;
      },
      fetchSpaceFail: (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      },
      createSpaceLoading: (state) => {
        state.createSpaceLoading = true;
      },
      createSpaceSuccess: (state) => {
        state.createSpaceLoading = false;
      },
      createSpaceFail: (state, { payload }) => {
        state.createSpaceLoading = false;
        state.error = payload;
      },
    },
  });
  
  const {reducer, actions} = spaceListSlice;

  export const {fetchSpaceFail, fetchSpaceSuccess, fetchSpaceLoading, createSpaceSuccess, createSpaceLoading, createSpaceFail} = actions

  export default reducer
  