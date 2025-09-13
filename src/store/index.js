import { configureStore } from "@reduxjs/toolkit";
import sideBarSlice from "./slices/sidebar";
import projectSlice from "./slices/project";
import userSlice from "./slices/user";

const store = configureStore({
  reducer: {
    sideBarSlice,
    projectSlice,
    userSlice,
  },
});

export default store;
