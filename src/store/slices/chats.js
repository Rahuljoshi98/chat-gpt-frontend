import apiKeys from "@/src/helpers/api/apiKeys";
import { handleErrorMessage } from "@/src/helpers/CommonFunctions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllChats = createAsyncThunk(
  "data/getchats",
  async function getChats(payload, thunkapi) {
    try {
      const response = await axios.get(`${apiKeys.chats}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      handleErrorMessage(error);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  allChats: [],
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.pending, (state) => {
        state.loading = true;
        state.allChats = [];
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.loading = false;
        state.allChats = action?.payload?.data || [];
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.allChats = [];
      });
  },
});

export default chatSlice.reducer;
