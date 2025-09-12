import { configureStore } from "@reduxjs/toolkit";
import sideBarSlice from "./slices/sidebar";
import projectSlice from "./slices/project";

const store = configureStore({
  reducer: {
    sideBarSlice,
    projectSlice,
  },
});

export default store;
