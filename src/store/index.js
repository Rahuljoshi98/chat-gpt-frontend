import { configureStore } from "@reduxjs/toolkit";
import sideBarSlice from "./slices/sidebar";

const store = configureStore({
  reducer: {
    sideBarSlice,
  },
});

export default store;
