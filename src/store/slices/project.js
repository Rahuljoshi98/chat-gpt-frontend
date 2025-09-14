import apiKeys from "@/src/helpers/api/apiKeys";
import { handleErrorMessage } from "@/src/helpers/CommonFunctions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const whoAmI = createAsyncThunk(
  "data/whoAMi",
  async function whoAmI(payload, thunkapi) {
    try {
      const response = await axios.get(`http://localhost:5000/whoami`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      handleErrorMessage(error);
    }
  }
);

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
  reducers: {
    addProject: (state, action) => {
      state.projectsList = [
        action.payload,
        ...state.projectsList.filter((proj) => proj._id !== action.payload._id),
      ];
    },
    removeProject: (state, action) => {
      state.projectsList = state?.projectsList?.filter(
        (proj) => proj._id !== action.payload
      );
    },
    updateProject: (state, action) => {
      state.projectsList = state?.projectsList?.map((proj) =>
        proj._id === action.payload._id ? action.payload : proj
      );
    },
  },
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

export const { addProject, removeProject, updateProject } =
  projectSlice.actions;
export default projectSlice.reducer;
