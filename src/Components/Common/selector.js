import { createSelector } from "reselect";

const getLoading = (state) => state.projectSlice.loading;
const getProjectList = (state) => state.projectSlice.projectsList;

export const HeaderSelector = () =>
  createSelector([getLoading, getProjectList], (loading, projectList) => ({
    loading,
    projectList,
  }));
