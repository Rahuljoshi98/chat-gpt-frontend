import { configureStore } from "@reduxjs/toolkit";
import sideBarSlice from "./slices/sidebar";
import projectSlice from "./slices/project";
import userSlice from "./slices/user";
import chatSlice from "./slices/chats";

const store = configureStore({
  reducer: {
    sideBarSlice,
    projectSlice,
    userSlice,
    chatSlice,
  },
});

export default store;
