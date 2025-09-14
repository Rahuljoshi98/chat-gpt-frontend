import apiKeys from "@/src/helpers/api/apiKeys";
import { handleErrorMessage } from "@/src/helpers/CommonFunctions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllChats = createAsyncThunk(
  "data/getchats",
  async function getChats(payload, thunkapi) {
    const { token } = payload;
    try {
      const response = await axios.get(`${apiKeys.chats}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleErrorMessage(error);
    }
  }
);

export const getChatHistory = createAsyncThunk(
  "data/gethistory",
  async function gethistory(payload, thunkapi) {
    try {
      const { id = null } = payload;
      const response = await axios.get(`${apiKeys.chats}/${id}`, {
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
  chatHistory: [],
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    updateChat: (state, action) => {
      state.allChats = state.allChats.map((chat) =>
        chat._id === action.payload._id ? { ...chat, ...action.payload } : chat
      );
    },
    removeChat: (state, action) => {
      state.allChats = state.allChats.filter(
        (chat) => chat._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // get all chats
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
      })
      // get chat history
      .addCase(getChatHistory.pending, (state) => {
        state.loading = true;
        state.chatHistory = [];
      })
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.chatHistory = action?.payload?.data || [];
      })
      .addCase(getChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.chatHistory = [];
      });
  },
});

export const { updateChat, removeChat } = chatSlice.actions;
export default chatSlice.reducer;
