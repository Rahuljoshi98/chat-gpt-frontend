import apiKeys from "@/src/helpers/api/apiKeys";
import { handleErrorMessage } from "@/src/helpers/CommonFunctions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProjectsList = createAsyncThunk(
  "data/projectList",
  async function getDetails(payload, thunkapi) {
    try {
      const response = await axios.get(`${apiKeys.projects}`, {
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
  projectsList: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectsList.pending, (state) => {
        state.loading = true;
        state.projectsList = [];
      })
      .addCase(getProjectsList.fulfilled, (state, action) => {
        state.loading = false;
        state.projectsList = action?.payload?.data || [];
      })
      .addCase(getProjectsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.projectsList = [];
      });
  },
});

export default projectSlice.reducer;
