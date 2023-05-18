import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFileIntialState, IFileList } from "../../modal/interface";

// This is the initial state of the file reducer
const fileInitialState: IFileIntialState = {
  fileLoading: false,
  filesData: {
    files: [],
  },
  fileError: "",
};

// This is the async thunk which is used to fetch the file list
export const fetchFiles = createAsyncThunk<IFileList>(
  "files/fetch",
  async () => {
    const response = await axios.get(
      "https://646312614dca1a661353d0ee.mockapi.io/api/Files"
    );
    return {
      files: response.data,
    };
  }
);

// This is the slice of the file reducer
const fileSlice = createSlice({
  name: "files",
  initialState: fileInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        return {
          ...state,
          fileLoading: true,
        };
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        return {
          ...state,
          filesData: action.payload,
          fileLoading: false,
        };
      })
      .addCase(fetchFiles.rejected, (state) => {
        return {
          ...state,
          fileError: "Something went wrong",
          fileLoading: false,
        };
      });
  },
});

// This is the reducer of the file reducer
export default fileSlice.reducer;
