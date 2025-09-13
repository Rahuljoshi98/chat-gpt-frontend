import { createSelector } from "reselect";

const getLoading = (state) => state.projectSlice.loading;
const getProjectList = (state) => state.projectSlice.projectsList;
const getUserDetails = (state) => state.userSlice.userDetails;
const getChatList = (state) => state.chatSlice.allChats;

export const HeaderSelector = () =>
  createSelector(
    [getLoading, getProjectList, getUserDetails, getChatList],
    (loading, projectList, userDetails, allChats) => ({
      loading,
      projectList,
      userDetails,
      allChats,
    })
  );
