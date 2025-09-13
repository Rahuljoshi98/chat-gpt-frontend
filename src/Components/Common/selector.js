import { createSelector } from "reselect";

const getLoading = (state) => state.projectSlice.loading;
const getProjectList = (state) => state.projectSlice.projectsList;
const getUserDetails = (state) => state.userSlice.userDetails;

export const HeaderSelector = () =>
  createSelector(
    [getLoading, getProjectList, getUserDetails],
    (loading, projectList, userDetails) => ({
      loading,
      projectList,
      userDetails,
    })
  );
