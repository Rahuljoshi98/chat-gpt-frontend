import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    trackCollapse: (state, action) => {
      const currentState = action.payload;
      state.isCollapsed = currentState;
    },
  },
});

export const { trackCollapse } = sideBarSlice.actions;

export default sideBarSlice.reducer;
