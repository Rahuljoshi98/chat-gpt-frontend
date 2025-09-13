import { createSelector } from "reselect";

const getLoading = (state) => state.projectSlice.loading;
const getChatHistory = (state) => state.chatSlice.chatHistory;

export const ChatSelector = () =>
  createSelector([getLoading, getChatHistory], (loading, chatHistory) => ({
    loading,
    chatHistory,
  }));
